import React, { Component } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie'
const cookies = new Cookies()

// import { dom } from '@fortawesome/fontawesome-svg-core'
 class Login extends Component {
     constructor(props) {
         super(props)
         this.state = {
              email : '',
              password : '',
              redirect : false,
              goTo :this.props.location.goTo
         }
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
     }
     handleChange = (event) =>{
            this.setState ({
                [event.target.name]:event.target.value
            })
     }
     handleSubmit =async(event) =>{

            event.preventDefault();
            const users = {
                email : this.state.email,
                password :this.state.password
            }

            //  axios.post(`http://localhost:3001/users/login`, users).then((response)=>{
            //     if(response.data.user){
            //         // console.log(response.headers)
            //         // document.cookie=`Authorization=${response.data.token}`
            //         localStorage.setItem("token",JSON.stringify(response.data.user));
            //         this.setState({
            //             redirect : true
            //         })
            //     }
            //     // document.cookie = `Authorization1=${response.data.token};max-age=${+60*60*24*2}`
            //     // cookies.set('jwt1',response.data.token, { path: '/' })
            //     console.log(response)
            //     this.setState({redirect : true})
            //  }).catch((error) =>{
            //     //  console.log(error.response.status)
            //         if(error.response.status === 500){
            //             alert('Server Problem Please try again later..')
            //         }
            //         else{
            //             alert('Unable to Loggin')
            //         }
            //  })

            let response = await axios.post(`http://localhost:3001/userDetails/login`,users)
            // console.log(response.data.user);
            if(response.data.user){
                localStorage.setItem("token",JSON.stringify(response.data.user));
                this.setState({
                    redirect : true
                })
            }
            else{
                alert(response.data.message);
            }
     }
    render() {
        // console.log(this.state.goTo);
        if (this.state.redirect) {
            return <Redirect to={{
                pathname : '/',
                // isVerified: true
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
                        <h2 className="text-center">Login Now</h2>

                            <form className="login100-form validate-form" onSubmit = {this.handleSubmit}>
                                <div className="wrap-input100 validate-input">
                                    <span className="label-input100">Email</span>
                                    <input onChange={this.handleChange} value={this.state.email}  className="input100" type="email" name="email" autoComplete ="on" placeholder="Type your email-address" />
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <span className="label-input100">Password</span>
                                    <input onChange={this.handleChange} value={this.state.password} className="input100" type="password" name="password" autoComplete ="on" placeholder="Type your password" />
                                    <span className="focus-input100 password"></span>
                                </div>

                                <div className="text-right p-t-8 p-b-31">
                                        <a href="/forgetPassword" rel="">
                                                Forget Password?
                                        </a>
                                </div>

                                <div className="container-login100-form-btn">
                                    < div className="wrap-login100-form-btn">
                                        <button type="submit" className="btn btn-primary mr-2">
                                            Login
                                        </button>
                                        <Link to = "/signUp" > <button className="btn btn-primary mr-2">New User</button> </Link>
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

export default Login
