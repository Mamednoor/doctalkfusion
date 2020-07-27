import React, { useState, useEffect } from 'react'
import Header from '../header/header'
import ContactRequestContainer from './contactrequestcontainer'
import axios from 'axios'

const ContactRequest = () => {
    const [invitations, setInvitations] = useState([])
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        fetchInvitations()
    }, [refresh])

    const fetchInvitations = () => {
        const docId = localStorage.getItem('doctor')
        axios.get(`http://localhost:7500/invitations/${docId}`)
            .then(res => setInvitations(res.data))
    }

    const onDelete = (e) => {
        setRefresh(!refresh)
        axios.delete('http://localhost:7500/invitations', { data: { id: e.target.id } })
    }
    return (
        <div>
            <Header title="Contact Request" />
            <div className='request-container'>
                {invitations.map(invit => {
                    return (
                        <ContactRequestContainer
                            id={invit.id}
                            link={invit.link}
                            onDelete={e => onDelete(e)}
                            firstname={invit.pa_firstname}
                            lastname={invit.pa_lastname}
                            object={invit.subject}
                            message={invit.text} />
                    )
                })}
            </div>

        </div>
    )
}


export default ContactRequest; 