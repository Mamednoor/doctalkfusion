import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import search from '../shares/searchdoctalk.png'
import profile from '../shares/profile.png'
import favori from '../../Assets/heart-03.svg'
import message from '../../Assets/mail-03.svg'

import './navbar.css'


class Navbar extends Component {
    render() {
        return (
            
            <div className="navbar-container">
            <ul>
                <li>
                  <Link to="/profile"><img className="search-img" alt="" src={profile}></img></Link>
                </li>
                <li>
                  <Link to="/search"><img className="search-img" alt="" src={search}></img></Link>
                </li>
                <li>
                  <Link to="/favori"><img className="search-img" alt="" src={favori}></img></Link>
                </li>
                <li>
                  <Link to="/messagebox"><img className="search-img" alt="" src={message}></img></Link>
                </li>
              </ul>
              </div>
        )
    }
}

export default Navbar