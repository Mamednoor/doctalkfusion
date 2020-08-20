import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import './CardDoctor.css'
import mailIcon from '../../Assets/mail-02.svg'
import heartIcon from '../../Assets/heart-02.svg'
import fillHeartIcon from '../../Assets/heart-01.svg'

function CardDoctor(props) {
    const [favorite, setFavorite] = useState()
    const [patient, setPatient] = useState([])
    const [invitation, setInvitation] = useState(false)
    const { doctor } = props
    const history = useHistory();
   
    useEffect(() => {
        const idPatient = localStorage.getItem('patient')
        axios.get(`http://localhost:7500/patients/${idPatient}/doctors/${doctor.id}`)
            .then(res => res.data.length !== 0 ? setFavorite(true) : setFavorite(false))
    }, [favorite])

    useEffect(() => {
        const idPatient = localStorage.getItem('patient')
        
        axios.get(`http://localhost:7500/patients/${idPatient}`)
        .then(res => setPatient(res.data))
    }, [])

    const createProfilIcon = () => {
        return (
            <div className='profil-icon'>
                <h2>{doctor.doc_firstname.slice(0, 1)}
                    {doctor.doc_lastname.slice(0, 1)}</h2>
            </div>
        )
    }
    const sendInvitation = (e) => {
        const target = e.target
        const docId = e.target.parentNode.id

        setInvitation(!invitation)
        if (invitation)
            target.style.opacity = '0.3'
        else
            target.style.opacity = '1'
        history.push('/form', [docId, doctor.doc_lastname, patient[0].pa_firstname])
    }
    const handleSetFavorite = (e, id = 1) => {
        const target = e.target
        setFavorite(!favorite)
        if (!favorite)
            axios.post('http://localhost:7500/patients/doctors', { patient_id: id, doctor_id: parseInt(target.parentNode.id) })
        else
            axios.delete('http://localhost:7500/patients/doctors', { data: { patient_id: id, doctor_id: parseInt(target.parentNode.id) } })
    }

    return (
        <div id={doctor.id} className='CardDoctor'>
            <h3>{doctor.doc_firstname} <span>{doctor.doc_lastname.toUpperCase()}</span></h3>
            <p>{doctor.pro_name}</p>
            <p>({doctor.doc_city})</p>
            {createProfilIcon()}
            <img onClick={(e) => sendInvitation(e)} src={mailIcon} alt='' />
            <img onClick={(e) => handleSetFavorite(e)} src={favorite ? fillHeartIcon : heartIcon} alt='' />
        </div>
    );
}

export default CardDoctor;