import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../header/header'
import MessageBoxCont from './messageBoxCont'

const MessageBox = () => {
    const [invitations, setInvitations] = useState([]);
    const isDoctor = localStorage.getItem('isDoctor')
    const date = new Date()
    useEffect(() => {
        
        const idDoc = localStorage.getItem('doctor')
        const idPatient = localStorage.getItem('patient')
        if (isDoctor === 'true') {
            axios.get(`https://doc-talk-back.herokuapp.com/invitations/${idDoc}`)
                .then(res => setInvitations(res.data))
        } else {
            axios.get(`https://doc-talk-back.herokuapp.com/invitations/patients/${idPatient}`)
                .then(res => setInvitations(res.data))
        }
    }, [])
    console.log(isDoctor)
    if (isDoctor === 'true') {
        return (
            <div>
                <Header title="Messages" />
                {invitations && invitations.map(invit => {
                    return <MessageBoxCont firstname={`${invit.pa_firstname} ${invit.pa_lastname}`} date={date.now} message={invit.text} />
                })}
            </div>
        )

    }else {
        return (
            <div>
                <Header title="Messages" />
                {invitations && invitations.map(invit => {
                    return <MessageBoxCont firstname={`${invit.doc_firstname} ${invit.doc_lastname}`} date={date.now} message={invit.text} />
                })}
            </div>
        )
    }

}









export default MessageBox