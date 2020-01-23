import React, { Component } from 'react'
import './Videos.css';
import "../../../node_modules/video-react/dist/video-react.css";
import { Player, videoActions } from 'video-react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
 class Videos extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              content:[],
              
         }
     }
     async componentWillMount()
     {
            let response = await axios.get(`http://localhost:3001/video/`);//all  description details(for login and also for logout)
            if(response.data){
            this.setState({
                content: response.data,//sabhi description ka content aa jaye
            });
        }
     }
    render() {
        return (
            this.state.content.length!=0? (this.state.content.map((value,index) => 
            <div key = {index} >
                 <hr />
                <div className = "flex-container1">
                   <div className = "description">
                            < div id="child1">
                                <h4>{value.heading}</h4>
                                <p>{value.description}</p>
                                <p>{value.date.substr(0,10).split("-").reverse().join("-")}</p>
                            </div>
                            <div id = "child2">
                                {/* <video controls >
                                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
                                </video> */}
                                <img src={value.image} alt="descriptionImage"></img>
                                <h4>{value.heading}</h4>
                            </div>
                    </div>
                    <div className = "likeImage">
                        <img style={{height:'50%',width:"50%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcEsudPG7eBaMlFSBSfvVzecaIGenCdeczbLfTQz9i_nYgSNOP&s" alt="like image"/>
                    </div>
                </div>
            </div>
            ))
            :
            (
                <h2>Loading</h2>
            )
        )
    }
}

export default Videos
