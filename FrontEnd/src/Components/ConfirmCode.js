import React, { Component } from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './Login.css'
class ConfirmCode extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             verifyCode : '',
             code: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) =>{
        this.setState ({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit =async (event) =>{
        event.preventDefault();
        const users = {
            userName: this.props.location.userDetails.userName,
            email : this.props.location.userDetails.email,
            password :this.props.location.userDetails.password,
            rePassword: this.props.location.userDetails.rePassword,
            code : this.state.code
        }
        try{
            
            let response = await axios.post(`http://localhost:3001/userDetails/signUp/verify`,users)
        
            if(response.data.user){
                this.setState({
                    redirect : true
                })
            }
            else{
                this.setState({
                    verifyCode:'verify Code Not Match'
                })
            }
        }
        catch(err){
            alert(err);
        }
    }
    
    render() {
        const {redirect} = this.state;
        if(redirect){
            return <Redirect to={{
                pathname : '/',
                isVerified : true 
            }} />
        }
        return (
            <div>
                <section className="login-block">
                
                 <div className="container">
                  <div className="row">    
                    <div className="col-md-4 banner-sec">   
                       <div className="signup__overlay"></div>          
                       <div className="banner">
                         <div id="demo" className="carousel slide carousel-fade" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#demo" data-slide-to="0" className="active"></li>
                                <li data-target="#demo" data-slide-to="1"></li>
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="https://register.wyfegypt.com/images/form-wizard-login.jpg" className="img-fluid" alt="image"/>
                                        <h1>GROW with Technology</h1>
                                </div>
                            </div>
                         </div>
                        </div>
                     </div>
                     <div className="col-md-8 login-sec">
                        <h2 className="text-center">SignUp for Free !</h2>
                       <p style={{color:'red'}}>{this.state.verifyCode}</p>
                            <form method="post" className="login100-form validate-form" onSubmit = {this.handleSubmit}>
                                <div className="wrap-input100 validate-input">
                                    <span className="label-input100">Enter The Code Here</span>
                                    <input onChange={this.handleChange} value={this.state.userName}  className="input100" type="text" name="code" autoComplete ="off" placeholder="Type your Code Here" />
                                    <span className="focus-input100"></span>
                                    <span className="label-input100"><p style={{color : 'red'}}>Please check your email for code</p></span>
                                </div>
                                <div className="container-login100-form-btn">
                                    < div className="wrap-login100-form-btn">
                                        <button className="btn btn-primary mr-2">
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
    )
}
}
export default ConfirmCode
