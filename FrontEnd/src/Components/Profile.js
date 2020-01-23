import React, { Component } from 'react'
import './Profile.css'
import axios from 'axios'
 class Profile extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              profile : '',
              error : '',
              mainError : ''
         }
         this.handleSubmit = this.handleSubmit.bind(this)
     }
     handleSubmit(){

     }
      componentDidMount(){

        //  axios.post('http://localhost:3001/userProfile')
        //         .then((response) => {
        //             console.log(response.data)
        //             this.setState({
        //                 profile : response.data
        //             })
        //         }) .catch((error) => {
        //             console.log(error.response.status)
        //             if(error.response.status === 401){
        //                 this.setState({
        //                     mainError : 'Authentication Error ! ',
        //                     error : 'Opps ! You are not Logged Please Loggin or SignUp to view Profile '
        //                 })
        //             }
        //         })
        const token = JSON.parse(localStorage.getItem("token"));
        axios.get(`http://localhost:3001/userDetails/me/${token.email}`).then((response) =>{
            if(response.status == 200){
                console.log(response.data)
                this.setState({
                    profile : response.data.user
                })
            }
        }).catch((e)=>{
                if(e.response.status == 400){
                    this.setState({
                        error : 'You are not LoggedIn'
                    })
                }
                else{
                    this.setState({
                        error : 'Server Can\' reach'
                    })
                }
        })
     }
    render() {
        return (
            <div className = "top-div" style = {{marginBottom:'10%'}}>
                    <h1>Profile</h1>
                    <form onSubmit = {this.handleSubmit} method = "POST">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                <label >Email</label>
    <input type="email" className="form-control" id="inputEmail4" placeholder="Email" readOnly value = {this.state.profile.email}></input>
                                </div>
                                <div className="form-group col-md-6">
                                <label >Name</label>
        <input type="email" className="form-control" id="inputEmail4" placeholder="Name" value= {this.state.profile.userName}></input>
                                </div>
                                <div className="form-group col-md-6">
                                <label >Password</label>
                                <input type="password" className="form-control" id="inputPassword4" placeholder="Password" formNoValidate></input>
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Address</label>
        <input type="text" className="form-control" id="inputAddress" placeholder="Address" value = {this.state.profile.address}></input>
                            </div>
                            <div className="form-group">
                                <label >Age</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="Age" value = {this.state.profile.age}></input>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                <label >City</label>
                                <input type="text" className="form-control" id="inputCity" value = {this.state.profile.city} placeholder="City"></input>
                                </div>
                                <div className="form-group col-md-4">
                                <label >State</label>
                                <select id="inputState" className="form-control">
                                    <option selected>Haryana</option>
                                    <option>Rajastan</option>
                                    <option>Punjab</option>
                                    <option>Madhya Pardesh</option>
                                    <option>Dellhi</option>
                                </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck" ></input>
                                <label className="form-check-label" >
                                    Check me out
                                </label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Edit Profile</button>
                            </form>
            </div>
        )
    }
}

export default Profile
