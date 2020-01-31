
import React, { Component } from 'react'
import Footer from './Footer.js'
import NavBar from './NavBar.js'
import PostContent from './PostContent/Post.js'
import Gadget from './Gadget'
import ContactUs from './ContactUs.js'
import 'bootstrap/dist/css/bootstrap.css'
import GoogleMaps from './GoogleMaps.js'
import Profile from './Profile'
import axios from 'axios'
import StartUp from './StartUp/StartUp'

 class MainPage extends Component {
     constructor(props) {
         super(props);
         console.log('Constructor mainpage');
         this.state = {
              isVerified : false,
         }
     }
     checkToken = () => {
        if(localStorage.getItem("token")!==null){
            return true;
        } else {
            return false;
        }

        // const response = await axios.get('http://localhost:3000/user/checkcookie');
        // if(response.data.msg){
        //     return true
        // }
        // else{
        //     return false
        // }
     }
     componentWillMount(){
         console.log('MAinPAge')
     }
    render() {
        // console.log('props navbar');
        // console.log(this.props.location.middleContent);
        var verified = this.checkToken();
        // console.log('render mainpage');
        return (
            
            <div >
                <NavBar isVerified ={ verified} />
                 { (this.props.location.middleContent===undefined || this.props.location.middleContent === 'gadget') && <React.Fragment><h1 >Gadget</h1><Gadget isVerified ={verified} /></React.Fragment> }
                { this.props.location.middleContent === 'postContent' &&<React.Fragment><PostContent isVerified = {verified}/></React.Fragment>}
                {this.props.location.middleContent === 'viewProfile' && <Profile isVerified = {verified}/>}
                {this.props.location.middleContent === 'startUps' && <React.Fragment><h1>StartUps</h1><StartUp isVerified = {verified}></StartUp></React.Fragment>}
                <div style={{width:'100%',display:'flex',flexWrap:'nowrap'}}>
                    <div style = {{width:'40%'}}>
                        <ContactUs />
                    </div>
                    <div style = {{width:'60%',float:'left'}}>
                        <GoogleMaps />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default MainPage
