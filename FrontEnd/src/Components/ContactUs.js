import React, { Component } from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './ContactUs.css'
class ContactUs extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:'',
             email :'',
             message:'',
             redirect:false,
             greetings:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) =>{
        this.setState ({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit = async(event) =>{
        event.preventDefault();
        const user = {
            name:this.state.name,
            email:this.state.email,
            message:this.state.message
        }
        const response = await axios.post("http://localhost:3001/contactUs",user);
        if(response.data.user!=null){
            this.setState({
                email:'',
                message:'',
                name:'',
                greetings:'Thanks for giving your Valuable Feedback!'
            })
        }
        else{
            alert(response.data.message);
        }
    }
    render() {
        const {redirect} = this.state
        // if(redirect){
        //     return <Redirect to ="/" />
        // }
        return (
            <div>
            <section className="mb-4">
                <div className = "ContactUs">
                    <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
                    
                    <p className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
                        a matter of hours to help you.</p>
                </div>
                <div className="row" >
                    <div className="col-md-9 mb-md-0 mb-5">
                        <form id="contact-form" onSubmit = {this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="md-form mb-0">
                                        <input  value ={this.state.name} type="text" id="name" name="name" className="form-control" onChange ={this.handleChange} required/>
                                        <label  className="">Your name</label>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="md-form mb-0">
                                        <input value ={this.state.email} type="email" id="email" name="email" className="form-control" onChange ={this.handleChange} required/>
                                        <label  className="">Your email</label>
                                    </div>
                                </div>

                            </div>
                            <div className="row">

                                <div className="col-md-12">

                                    <div className="md-form">
                                        <textarea value ={this.state.message} type="text" id="message" name="message" rows="2" className="form-control md-textarea" onChange ={this.handleChange}required></textarea>
                                        <label >Your message</label>
                                    </div>

                                </div>
                            </div>
                            <p style= {{color:'red'}}>{this.state.greetings}</p>
                            <div className="wrap-login100-form-btn">
                                <button  className="btn btn-primary mr-2">Send</button>
                            </div>
                        </form>
                        
                        {/* <div className="status"></div> */}
                    </div>                

                </div>
            </section>
        </div>
        
        )
    }
}

export default ContactUs
