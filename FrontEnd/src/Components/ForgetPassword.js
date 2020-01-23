import React, { Component } from 'react'
import './Login.js'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
class ForgetPassword extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             resetCode:'',
             visibleResetCode: 'hidden',
             visibleResetPasswordScope:'hidden',
             redirect:false,
             password :'',
             rePassword : '',
             passError :'',
             rePassError :''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCodeButton = this.handleCodeButton.bind(this);
        this.handleVerifyCode = this.handleVerifyCode.bind(this);
        this.handleRePasswordError = this.handleRePasswordError.bind(this);
         this.handlePasswordError = this.handlePasswordError.bind(this);
    }
    handleVerifyCode = async (event) =>{
        const user = {
            email : this.state.email,
            resetCode : this.state.resetCode
        }
        let response = await axios.post(`http://localhost:3001/userDetails/resetPassword/verifyCode`,user);
            if(response.data.user){
                this.setState ({
                    visibleResetPasswordScope : true
                })
            }
            else{
                alert(response.data.message);
            }
    }
    handleChange = (event) =>{
        if(event.target.name === 'password'){
             this.handlePasswordError(event.target.value);
        }
        if(event.target.name ==='rePassword'){
            this.handleRePasswordError(event.target.value);
        }
        this.setState ({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit = async(event) =>{
        event.preventDefault();
        if(this.state.password === this.state.rePassword){
            const user = {
                email : this.state.email,
                password : this.state.password
            }
            let response = await axios.post(`http://localhost:3001/userDetails/resetPassword/updatePassword`,user);
                this.setState ({
                    redirect : true
                })
            }

    }
    handlePasswordError = async (event) =>{
        this.state.passError = '';
        if(event.length < 10 || event.length > 50){
              this.state.passError = 'password must be in between 10 to 50'
        }
       // passError = result;
    }
    handleRePasswordError = (event) =>{
       this.state.rePassError = '';
        if(this.state.password != event){
               this.state.rePassError = 'Passwords do not match.';
        }
   }
    handleCodeButton =async (event) =>{
        event.preventDefault();
        const user ={
            email : this.state.email,
        }
        let response = await axios.post('http://localhost:3001/userDetails/resetPassword/sendCode',user);
        if(response.data.user){
            this.setState({
                visibleResetCode : 'visible'
            })
        }

    }
    render() {
        const { redirect } = this.state;

        if (redirect) {
          return <Redirect to='/login'/>;
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
                        <h2 className="text-center">Reset Password</h2>

                            <form className="login100-form validate-form" onSubmit = {this.handleSubmit}>
                                <div className="wrap-input100 validate-input">
                                    <span className="label-input100">To reset your password, enter your username below and submit. An email will be sent to you with instructions about how to complete the process.</span>
                                    <input  type="email" onChange={this.handleChange} value={this.state.email}  className="input100"  name="email" placeholder="Type your email-address" autoComplete="on" required/>
                                    <span className="focus-input100"></span>
                                </div>
                                <div className="container-login100-form-btn">
                                    <div className="wrap-login100-form-btn">
                                        <button className="btn btn-primary mr-2" onClick = {this.handleCodeButton}>
                                            Send OTP
                                        </button>
                                    </div>
                                </div>
                                <div className="wrap-input100 validate-input" style ={{visibility:this.state.visibleResetCode}}>
                                    <span className="label-input100">Please Enter the Code You been Mailed.</span>
                                    <input onChange={this.handleChange} value={this.state.resetCode}  className="input100" type="text" name="resetCode" placeholder="Please Enter the Correct Code" autoComplete="on" required/>
                                    <span className="focus-input100"></span>
                                </div>
                                <div className="container-login100-form-btn" style ={{visibility:this.state.visibleResetCode}}>
                                    <div className="wrap-login100-form-btn">
                                        <button className="btn btn-primary mr-2" onClick = {this.handleVerifyCode}>
                                            Verify
                                        </button>
                                    </div>
                                </div>
                                <div className="wrap-input100 validate-input" style ={{visibility:this.state.visibleResetPasswordScope}}>
                                    <span className="label-input100">Enter New Password</span>
                                    <input  type="password" onChange={this.handleChange} value={this.state.password}  className="input100"  name="password" placeholder="Type your new Password" autoComplete="off" required/>
                                    <span className="focus-input100"></span>
                                </div>
                                <p style={{color:'red',fontSize:'10px'}}>{this.state.passError}</p>
                                <div className="wrap-input100 validate-input" style ={{visibility:this.state.visibleResetPasswordScope}}>
                                    <span className="label-input100">Confirm Password</span>
                                    <input  type="password" onChange={this.handleChange} value={this.state.rePassword}  className="input100"  name="rePassword" placeholder="Confirm Password" autoComplete="off" required/>
                                    <span className="focus-input100"></span>
                                </div>
                                    <p style={{color:'red',fontSize:'10px'}}>{this.state.rePassError}</p>
                                <div className="container-login100-form-btn"  style ={{visibility:this.state.visibleResetPasswordScope}}>
                                    <div className="wrap-login100-form-btn">
                                        <button type="submit" className="btn btn-primary mr-2" >
                                            Reset Password
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <div className="copy-text">Created with
                            <i className="fa fa-heart"></i> by
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    )
}
}


export default ForgetPassword
