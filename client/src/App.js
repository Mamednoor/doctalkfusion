import React from "react";
import "./App.css";
import Login from "./Components/login/login";
import Register from "./Components/register/register";
import Navbar from "./Components/navbar/navbar";
import Join from "./Components/Join/Join"
import Chat from "./Components/Chat/Chat"
import ContactRequest from "./Components/contact/contactRequest"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchDoctor from "./Components/SearchDoctor/SearchDoctor";
import FavoriteDoctor from './Components/FavoriteDoctor/FavoriteDoctor'
import Profile from './Components/profile/profile'
import MessagesBox from './Components/MessageBox/messageBox'


function App() {
  const whatPrint = () => {
    if (localStorage.getItem('isDoctor') !== 'true') {
      return <FavoriteDoctor />
    } else {
      return <ContactRequest />
    }
  }
  
  return (
    <Router >
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/search">
            <SearchDoctor />
            <Navbar />
          </Route>
          <Route path="/favori">
            {whatPrint()}
            <Navbar />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/contactrequest">
            <ContactRequest />
          </Route>
          <Route path="/profile">
            <Profile />
            <Navbar />
          </Route>
          <Route path="/messagebox">
            <MessagesBox />
            <Route />
            <Navbar />
          </Route>
        <Route path="/form" component={Join} />
        <Route path="/chat" component={Chat} />
        </Switch>
      </div>
    </Router >
  );
}

export default App;