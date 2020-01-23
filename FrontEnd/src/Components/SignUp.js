import React, { Component } from 'react';
import './SignUp.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { exportDefaultSpecifier } from '@babel/types';
var passError =''
var rePassError =''
// const express  = require ('express');
// const app = express();//get post put delete methods 
const Joi  = require('joi'); //class is return..so Ist letter is Caps...for validation of input...

// app.use(express.json());//middle ware....
 class SignUp extends Component {
     constructor(props) {
         super(props)
         this.state = {
              userName:'',
              email : '',
              password : '',
              rePassword: '',
              redirect : false,
            //   errorPass : '',
            //   errorRePass : ''
         }
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleSubmitRecords = this.handleSubmitRecords.bind(this);
         this.handleRePasswordError = this.handleRePasswordError.bind(this);
         this.handlePasswordError = this.handlePasswordError.bind(this);
     }
     handleChange = (event) =>{
            
            if(event.target.name === 'password'){
                //  const obj ={
                //      password : event.target.value
                //  }
                 this.handlePasswordError(event.target.value);
            }
            if(event.target.name ==='rePassword'){
                this.handleRePasswordError(event.target.value);
            }
            // console.log('handle change');
            this.setState ({
                [event.target.name]:event.target.value
            })
            
     }
     handleSubmitRecords = async (event) => {
        
        const users = {
            userName: this.state.userName,
            email : this.state.email,
            password :this.state.password,
            rePassword: this.state.rePassword,

        }

            const response = await axios.post("http://localhost:3001/userDetails/signUp/sendCode",users);
            // console.log(response.data.user);
            if(response.data.user != null){
                var details = {
                    userName : this.state.userName,
                    email: this.state.email
                }
                localStorage.setItem("token" , JSON.stringify(details));
                this.setState({
                    redirect : true
                })
            }
            else{
                alert(response.data.message);
            }
         
          
     }
     handleSubmit =async(event) =>{
            event.preventDefault();
            if(passError === '' && rePassError === '')
                this.handleSubmitRecords();
            else
                alert('Please verify all fields');
     }
     handlePasswordError = async (event) =>{
         passError = '';
         if(event.length < 10 || event.length > 50){
                passError = 'password must be in between 10 to 50'
         }
        // passError = result;
     }
     handleRePasswordError = (event) =>{
        rePassError = '';
         if(this.state.password != event){
                rePassError = 'Passwords do not match.';
         }
    }
    render() {
    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to = {{
           pathname : '/confirmCode',
            userDetails: {userName:this.state.userName,email:this.state.email,password:this.state.password, rePassword :this.state.rePassword }
       }}/>;
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
                            <form method="post" className="login100-form validate-form" onSubmit = {this.handleSubmit}>
                            <div className="wrap-input100 validate-input">
                                    <span className="label-input100">UserName</span>
                                    <input onChange={this.handleChange} value={this.state.userName}  className="input100" type="text" name="userName" autoComplete ="on" placeholder="Type your userName" required/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <span className="label-input100">Email</span>
                                    <input onChange={this.handleChange} value={this.state.email}  className="input100" type="email" name="email" autoComplete ="on" placeholder="Type your email-address" required/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <span className="label-input100">Password</span>
                                    <input onChange={this.handleChange} value={this.state.password} className="input100" type="password" name="password"  autoComplete ="on" placeholder="Type your password" required/>
                                    <span className="focus-input100 password"></span>
                                    
                                </div>
                                <p style={{color:'red'}}>{passError}</p>
                                <div className="wrap-input100 validate-input">
                                    <span className="label-input100">Repeat-Password</span>
                                    <input onChange={this.handleChange}  value={this.state.rePassword} className="input100" type="password" name="rePassword"  autoComplete ="on" placeholder="Confirm Password" required/>
                                    <span className="focus-input100 password"></span>
                                    
                                </div>
                                <p style={{color:'red'}}>{rePassError}</p>
                                <div className="text-right p-t-8 p-b-31">
                                        <a href="/forgetPassword" rel="">
                                            Forget Password?
                                        </a>
                                </div>

                                <div className="container-login100-form-btn">
                                    < div className="wrap-login100-form-btn">
                                        <button className="btn btn-primary mr-2">
                                            SignUp
                                        </button>
                                     <Link to = "/login">  
                                        <button className="btn btn-primary mr-2">
                                            Already Resistered?
                                        </button>
                                    </Link> 
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

export default SignUp;
