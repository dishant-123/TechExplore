import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './Navbar.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
import {Redirect} from 'react-router-dom';
let logout  = true;
let innerContentChange = false;
class NavBar extends Component {
    constructor(props) {
        super(props)
        console.log('contructor of navbar');
        this.state = {
             isVerified:this.props.isVerified,
             goToLoginPage:false,
             goToMainPage : false,
             changeContent : ''//bich vala component change karne ke liye
        }
        this.changeVerified = this.changeVerified.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.changeContent = this.changeContent.bind(this);
    }
    changeContent =(event, element)=>{
        // alert(event)
        console.log(element)
        // element.style.color = 'black'
        innerContentChange = true
        this.setState({
            changeContent : event
        })
    }
    changeVerified = ()=>{
        localStorage.removeItem("token");
        logout = true
        this.setState({
            isVerified : !this.state.isVerified,
            goToMainPage : true
        });

        // axios.post(`http://localhost:3001/users/logout`).then((response)=>{
        //     console.log(response)
        //     if(response.data.msg){
        //     this.setState({
        //         isVerified : !this.state.isVerified,
        //         goToMainPage : true
        //     })
        // }
           
        // }).catch((e)=>{
        //     if(e.response.status == 500){
        //         alert('Server Problem Please try again later..')
        //     }
        //     else{
        //         alert('Yor are not Loggin')
        //     }
        // });
    }
     handleButton =() =>{
         this.setState({
             goToLoginPage:true,
             isVerified : !this.state.isVerified
         })
     }
    render() {
        console.log('Navbar render');
        // console.log(this.state.changeContent)
        // console.log(innerContentChange)
        if(this.changeContent!=='' && innerContentChange)//bich vala content ko kyaa print krna h vo bata rha h
        {
            innerContentChange = false;
            return <Redirect to = {{
                pathname : '/',
                middleContent :this.state.changeContent
            }} />
        }
        if(this.state.goToLoginPage){
            return <Redirect to ='/Login' />;
        }
        if(this.state.goToMainPage && logout )
        {
            logout = false;
            return <Redirect to={{
                    pathname : '/',
                    // isVerified: true
            }}/>;
              
        }
        return (
           
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top" >
                <font className="navbar-brand " >TechExplore</font>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                    <li className="nav-item" >
                        <font className="nav-link"  onClick = {() =>this.changeContent('gadget',this)}>Gadgets</font>
                        {/* <Link to ='/' goTo = 'gadget' /> */}
                    </li>
                    <li className="nav-item">
                        <font className="nav-link"  onClick = {() =>this.changeContent('startUps',this)}>StartUps</font>
                    </li>
                    <li className="nav-item">
                        <font className="nav-link"  onClick = {()=>this.changeContent('apps',this)}>Apps</font>
                    </li>
                    <li className="nav-item">
                        <font className="nav-link"  onClick = {() =>this.changeContent('video',this)}>Videos</font>
                    </li>
                    <li className="nav-item">
                        {this.state.isVerified && <font className="nav-link"   onClick = {() =>this.changeContent('postContent',this)}>PostContent</font>}
                    </li>
                    
                    <li>
                    {
                        this.state.isVerified === false ? 
                        (
                                <div className = "login-button">
                                        < button className = "btn btn-primary " onClick = {this.handleButton} type="button" >Login</button>     
                                </div>
                        
                        )
                        :
                        (
                            <div className = "login-button">
                            <button className = "btn btn-danger"onClick = {this.changeVerified} type="button" >logout</button>
                            </div>
                        )
                    }
                      
                    </li> 
                    { this.state.isVerified && 
                    <li className="nav-item dropdown text-right" style = {{float : 'right'}}>
                        <div className="nav-link dropdown-toggle abc"  id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <b style = {{color : 'black'}}>
                                {
                                    
                                }
                            </b>
                        </div>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <font  className="dropdown-item" onClick = {() =>this.changeContent('viewProfile')}>View Profile</font>
                            <font className="dropdown-item" onClick = {() =>this.changeContent('editProfile')}>Edit Profile</font>
                        </div>
                    </li>
                    }
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar
