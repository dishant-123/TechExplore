import React, { Component } from 'react'
import {Route,BrowserRouter} from 'react-router-dom'
import Login from './Components/Login.js'
import MainPage from './Components/MainPage.js'
import Gadget from './Components/Gadget.js'
import SignUp from './Components/SignUp.js'
import ForgetPassword from './Components/ForgetPassword.js'
import ConfirmCode from './Components/ConfirmCode.js'
import GadgetDiscription from './Components/GadgetDiscription.js'
import ContactUs from './Components/ContactUs.js'
import GoogleMaps from './Components/GoogleMaps.js'
import Videos from './Components/Videos/Videos.js'
import VideoDescription from './Components/Videos/Videodescription.js'
import Post from'./Components/PostContent/Post.js'
import Profile from './Components/Profile'
import StartUp from './Components/StartUp/StartUp'
class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter  >
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/video" component={Videos}/>
          <Route exact path="/postContent" component={Post}/>
          <Route exact path="/videoDescription" component={VideoDescription}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path= "/forgetPassword" component ={ForgetPassword} />
          <Route exact path = "/confirmCode" component = {ConfirmCode} />
          <Route exact path = "/gadgetDiscription" component = {GadgetDiscription} />
          <Route exact path = "/contactUs" component = {ContactUs} />
          <Route exact path = "/googleMaps" component = {GoogleMaps} />
          <Route exact path = "/gadget" component = {Gadget} / >
          <Route exact path = "/profile" component = {Profile} />
          <Route exact path = "/startup" component = {StartUp} />
      </BrowserRouter>
      
    
      </div>
    )
  }
}
export default App;
