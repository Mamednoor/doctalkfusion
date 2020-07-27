import React from 'react'
import './header.css'

const Header = (props) => {
    return (
        <div className="header-container">
            <p>{props.title}</p>
        </div> 
    )
}


export default Header; 