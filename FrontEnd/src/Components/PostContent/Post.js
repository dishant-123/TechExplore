import React, { Component } from 'react'
import './Post.css'
import Axios from 'axios';
 class Post extends Component {
     constructor(props) {
         super(props)
         this.state = {
                heading : '',
                description : '',
                imageSrc : '',
                selectedPath:'gadgetDetails',
                greetings : '',
                // isVerified : this.props.isVerified
         }
         this.handleFormSubmit = this.handleFormSubmit.bind(this);
         this.handleChange = this.handleChange.bind(this);
     }
     handleChange = (event)=>{
         console.log(event.target.value)
            this.setState({
                [event .target.name] : event.target.value,
                selectedPath : event.target.value
            })
     }
     handleFormSubmit = async(event)=>{
        // event.preventDefault();
        var logginDetails = JSON.parse(localStorage.getItem("token"));
        if(logginDetails == null)
        {
            this.setState({
                greetings : 'Please Login To submit Content !'
            })
        }
        else
        {
            const checkAuthorized = await Axios.get(`http://localhost:3001/admin/checkAuthorized/${logginDetails.email}`); 
            if( checkAuthorized.data!=null )
            {
                
                const details = {
                    heading :  this.state.heading,
                    image : this.state.imageSrc,
                    email : logginDetails.email,
                    userName : logginDetails.userName,
                    description : this.state.description
                }
                // console.log(this.state.selectedPath)
                const response = await Axios.post(`http://localhost:3001/${this.state.selectedPath}/`,details);
                // console.log(response);
                if(response.data.user!=null)
                {
                    this.setState({
                            greetings : 'You Post SuccessFully posted',
                            // heading:'',
                            // description : '',
                            // imageSrc:'',
                            // greetings : '' 
                    })
                }
            }
            else
            {
                this.setState({
                    greetings : 'You are not Authorised Person To Add Content onTechExplore'
                })
            }
        }
 }

    render() {
        return (
            <div className = "mainDiv">
            <section className="mb-4">
                <div >
                    <h2 className="h1-responsive font-weight-bold text-center my-4">Post Content</h2>
                    
                    <h5 className="text-center w-responsive mx-auto mb-5">Only Authorised person can add content on TechExplore.</h5>
                </div>
                <div className="row" >
                    <div className="col-md-9 mb-md-0 mb-5">
                    <div className = 'innerDivForm'>
                            <form onSubmit = {this.handleFormSubmit} >
                                    {/* <div className="row"> */}
                                        <div className="col-md-12">
                                                <div className="md-form mb-0">
                                                <label className = ''><h6>Select The Field of Information from below...</h6></label>
                                                    <select className = "innerDivSelect" value ={this.state.selectedPath} onChange = {this.handleChange}  name = 'selectedPath'>
                                                        <option value = 'gadgetDetails'>Gadget</option>
                                                        <option value = 'video'>Video</option>
                                                        <option value = 'apps'>Apps</option>
                                                        <option value= 'startUpDetails'>StartUps</option>
                                                    </select>
                                                </div>
                                        </div>
                                        {/* <div className="row"> */}
                                        <br/>
                                        <div className="col-md-12">
                                            <div className="md-form">
                                                <label className = ""><h6>Enter The Heading Of The Information...</h6></label>
                                                <input value ={this.state.heading} type= "text" name = 'heading'  id = 'heading' className="form-control"   onChange = {this.handleChange} required autoComplete="off"/>
                                            </div>

                                        </div>
                                        {/* </div> */}
                                        <div className="col-md-12">
                                            {/* <p>Source of Image</p>
                                            please enter the valid image path */}
                                            <div className="md-form mb-0">
                                            <label className = ''><h6>Enter The Image Source of Information...</h6></label>
                                                <input  value ={this.state.imageSrc} type= "text" name = 'imageSrc'   className="form-control"  onChange = {this.handleChange} required autoComplete="off"/>
                                            </div>
                                        </div>
                                        {/* </div> */}
                                        {/* <div className="row"> */}

                                        <div className="col-md-12">
                                            {/* <p>Description</p>
                                            this includes the Description imformation no limit of words fell free to add content */}
                                            <div className="md-form">
                                                <label className = ''><h6>Enter The Description of Information...</h6></label>
                                                <textarea  value ={this.state.description} type= "text" name = 'description'   className="form-control" onChange = {this.handleChange} required autoComplete="off"/>
                                            </div>

                                        </div>
                                    {/* </div> */}
                                    <div className="col-md-12">
                                        <p style= {{color:'red'}}>{this.state.greetings}</p>
                                        <div className="wrap-login100-form-btn">
                                            <button  className="btn btn-primary mr-2">Send</button>
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

export default Post
