import React, { Component } from 'react';
import './Comment.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { thisExpression } from '@babel/types';
import { loadPartialConfig } from '@babel/core';
// var id = '5dcd9ac215f1a00cb8e57ea3';
class GadgetDiscripton extends Component {
    constructor(props) {
        super(props)
        // console.log('constructor');
        this.state = {
             content : '',//[this.props.value]
             id : this.props.id,
             comment : '',
             redirect : false,
             subComment:'',
             visibleReplyTextArea :false,
             subCommentId:'',

         }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.getDetails = this.getDetails.bind(this);
        // this.handleSubReply = this.handleSubReply.bind(this);
         this.handleSubCommentReply = this.handleSubCommentReply.bind(this);
        this.showAllComments =this.showAllComments.bind(this);
        this.handleReply = this.handleReply.bind(this);
    }
    showAllComments = (event) =>{
            this.setState({
                goToAllCommentsPage : true
            })
    }
    handleSubCommentReply = async (event) =>{
        event.preventDefault();
        var logginDetails = JSON.parse(localStorage.getItem("token"));
        if(logginDetails!=null){
            const  ids ={
                    name : logginDetails.userName,
                    descriptionId : this.state.id,
                    subCommentId : this.state.subCommentId,
                    subComment:this.state.subComment
            }
            const response  = await axios.post(`http://localhost:3001/gadgetDetails/postSubComments`,ids);
            // console.log(response.data.descDetails);
            console.log(response.data.descDetails);
            if(response.data.descDetails!=null){
                    this.setState({
                        content : response.data.descDetails,
                        subComment:''
                    });
            }
            else{
                alert(response.data.message);
            }
        }
        else{
            this.setState({
                redirect : true
            })
        }
    }
    handleReply =(id) =>{
        this.setState({
            subCommentId :id,
            visibleReplyTextArea : !this.state.visibleReplyTextArea
        })
    }
    handleChange =(event)=>{
        this.setState({
            [event.target.name] : event.target.value,
        })
       
    }
    handleSubmit =async (event) =>{
        event.preventDefault();
        var logginDetails = JSON.parse(localStorage.getItem("token"));
        if(logginDetails!=null){
            const user ={
                name:logginDetails.userName,
                email : logginDetails.email,
                message:this.state.comment,
                visibleReplyTextArea : false
            }
            const response  = await axios.patch(`http://localhost:3001/gadgetDetails/gadgetDescriptionComments/${this.state.id}`,user);
            // console.log(response.data.descDetails);
            if(response.data.descDetails!=null){
                    this.setState({
                        content : response.data.descDetails,
                        comment:''
                    });
            }
            else{
                alert(response.data.message);
            }
        }
        else{
            this.setState({
                redirect : true
            })
        }
    }

    async componentWillMount(){
        // console.log('mount');
        const response = await axios.get(`http://localhost:3001/gadgetDetails/getDescriptionDetails/${this.state.id}`);
        // console.log(response.data.descDetails);
        if(response.data!=null){
            this.setState({
                content : response.data.descDetails
            })
           
        }
    }
    // getDetails = () =>{
    //     console.log('Hello')
    //     axios.get(`http://localhost:3001/gadgetDetails/getDescriptionDetails/${id}`)
    //     .then(data => this.setState({content:data.data.descDetails}))
    //     .catch(err =>{
    //         console.log(err);
    //         return null;
    //     })
    // }
    // componentDidMount(){
    //     this.getDetails();
    // }
    render() {
        // console.log('render');
        // console.log(this.state.content);
        // if(this.state.goToAllCommentsPage){
        //     return <Redirect to = {{
        //         pathname : '/showAllComments',
        //         AllComments : this.state.content.comments
        //     }}
        //     />
        // }
        const {redirect} = this.state
        if(redirect){
            return <Redirect to = {{
                pathname : '/Login',
                goTo : '/'
            }}
            />
        }
        return (
             this.state.content ?
             (
                <div className = "main-container" style ={{marginLeft:'15%',marginRight:'15%'}} >
                    {/* <img src = "https://www.hmiservices.com/sites/hmiservices.com/files/2016-12/Technical%20Solutions_0.jpg"></img>
                    <p>A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument.</p> */}
                    
                    <h1>{this.state.content.heading1}</h1>
                <img style={{height:'80%',width:'80%',marginBottom:'5%',marginTop:'3%'}} src = {this.state.content.image}/>
                <p style ={{width:'80%',color:'#333333',fontFamily:'font-family: Arial, Helvetica, sans-serif',fontSize:'18px',color:'#000000'}}>{this.state.content.description}</p>   
                <h3>Comments</h3>           
                {
                        this.state.content ?
                        (
                            <ul style={{width:'80%'}} >
                            {
                                this.state.content.comments.map((details,index) =>(
                                    <li key = {index}>
                                        <h6>{details.name}</h6>
                                        <font style ={{fontSize:'12px'}}>{details.date.substr(0,10)}</font><br/>
                                        <font style={{mar:"3%"}}>{details.message}</font><br/>
                                        <font onClick ={() =>this.handleReply(details._id)} style={{color:'blue'}}>reply</font><br/>
                                        {
                                            this.state.visibleReplyTextArea===true && this.state.subCommentId === details._id ? 
                                            (
                                                <div> 
                                                <ul>
                                                    { 
                                                        details.subComment ? (details.subComment.map((subCommentDetails,index) =>
                                                        (
                                                            <li key = {index} style={{width:'80%'}} type = "disc">
                                                                <h6>{subCommentDetails.name}</h6>
                                                                <font style ={{fontSize:'12px'}}>{subCommentDetails.date.substr(0,10)}</font><br/>
                                                                <font style={{mar:"3%"}}>{subCommentDetails.subMessage}</font><br/>   
                                                            </li>   
                                                        )))
                                                        :
                                                        (
                                                                <h1>Hello</h1>
                                                        )
                                                    }
                                                    </ul>
                                                    <textarea type="text" row="80" cols="100" onChange={this.handleChange} value={this.state.subComment} type="text" name="subComment" placeholder="Type your reply here" required/>
                                                    <div className = "wrap-login100-form-btn">
                                                        <button className ="btn btn-primary mr-2" onClick = {this.handleSubCommentReply} type="button" value = 'send reply'>send reply</button>
                                                </div>
                                                </div>
                                            ) 
                                            :
                                            (
                                                null
                                            )
                                        }
                                    </li>
                                )) 
                            }
                                {/* <p style={{color:'blue'}}  onClick = {this.showAllComments}  >show more comments</p> */}
                            </ul>
                    )
                    :
                    (
                        <h5>Loading....</h5>
                    )
            }
                    <form className="" onSubmit = {this.handleSubmit}>
                            <div className="">
                            <textarea row="80" cols="100" onChange={this.handleChange} value={this.state.comment} type="text" name="comment" placeholder="Type your comment here" required/>
                            </div>
                            <div className = "wrap-login100-form-btn">
                                <button className = "btn btn-primary mr-2">Add Comment</button>
                            </div>
                    </form>
                </div>
            )
            :
            (
                null
            )
            
        )
    }
}

export default GadgetDiscripton
