import React, { Component } from 'react';
import './StartUp.css';
import axios from 'axios';
import StartUpDescription from './StartUpDescription';

import 'bootstrap/dist/css/bootstrap.css'
// var login=false ;
class StartUp extends Component {
    constructor(props) {
        super(props);
        // console.log('gadgets constructor'  );
        this.state = {
            content : [],
            goToDisciption : false,
            Discription : '',
            isLogin : this.props.isVerified,//true when use is login else false. means logout
            activeUserLike  : []
        }
        this.handleLike = this.handleLike.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getContent=this.getContent.bind(this);
    }
    handleLike = async (id) =>{
        var logginDetails = JSON.parse(localStorage.getItem("token"));
        if(logginDetails!=null){
            const  user ={
                    name : logginDetails.userName,
                    email : logginDetails.email,
            }
            const response = await axios.patch(`http://localhost:3001/startUpDetails/startUpDescription/likeHandle/${id}`,user);//handle like of each description for each users.
            console.log('hjggu'+response.data.activeUserLike);
            this.setState({
                content : response.data.allDetails,
                activeUserLike : response.data.activeUserLike
            })
        }
        else{
            alert('PLease go to Login.');
        }
    }
     handleClick = (event) =>{
                this.setState({
                    goToDisciption : ! this.state.goToDisciption,
                    Discription : event
                });
        
        }
        // async componentDidMount(){
        //     console.log('will mount')
        //     var email = '';
        //     var userLikesResponse ='';
        //     const user = localStorage.getItem("token");  
        //     let a =[];
        //     if(user){
        //         var logginDetails = JSON.parse(localStorage.getItem("token"));
        //         email = logginDetails.email
        //     }
    
        //     if(email !== ''){
        //         userLikesResponse = await axios.get(`http://localhost:3001/gadgetDetails/activeUserLikes/${email}`);
        //         if(userLikesResponse !== null || userLikesResponse !== ''){
        //             a=userLikesResponse.data.activeUserLike;
        //     }
        //     }
        //     console.log(userLikesResponse +"dsgvfvf");
          
      
        //     let response = await axios.get(`http://localhost:3001/gadgetDetails`);//all  description details(for login and also for logout)
        //      if(response.data){
        //         this.setState({
        //             content: response.data,//sabhi description ka content aa jaye
        //             email : email,
        //             activeUserLike : a
        //         });
        //     }
        // }
        getContent =async(isLogin)=>{
        console.log(isLogin);
        if(isLogin == true)
        {
            var logginDetails = JSON.parse(localStorage.getItem("token"));
            // if(userLikesResponse !== null || userLikesResponse !== '')
            // {
                var userLikesResponse = await axios.get(`http://localhost:3001/startUpDetails/activeUserLikes/${logginDetails.email}`);
                let response = await axios.get(`http://localhost:3001/startUpDetails`);//all  description details(for login and also for logout)
                if(response.data){
                   this.setState({
                       content: response.data,//sabhi description ka content aa jaye
                       activeUserLike : userLikesResponse.data.activeUserLike
                   });
               }
        }
        // }
        else
        {
                let response = await axios.get(`http://localhost:3001/startUpDetails`);//all  description details(for login and also for logout)
                if(response.data){
                this.setState({
                    content: response.data,//sabhi description ka content aa jaye
                    activeUserLike : []
                });
            }
        }
    }
     componentWillReceiveProps()
    {
        console.log('will props receive');
        this.getContent(false);
    }
    componentDidMount()
    {
        console.log('will mount')
        this.getContent(this.state.isLogin);
    }
    render() {
        return (
        
         this.state.content.length!=0? (this.state.content.map((value,index) => 
             <div key ={index} className = "mainrdiv">
                <hr />
                <div className="flex-container" >
                    <div  className = "flex-child-1"  onClick = { () =>this.handleClick(value)}>
                        <div id="heading">
                            <font style= {{lineHeight:'1.'}}>
                            {value.heading}
                            </font>
                            <p style={{fontSize:'13px'}}>date = {value.date.substr(0,10).split("-").reverse().join("-")}</p>
                        </div>
                        <div  id="description" className="shadow-none  mb-5 bg-blue rounded">
                            <p style= {{lineHeight:'1.2'}}>{value.description.substr(0,200)+'...'}</p>
                        </div>
                        <div id="image">
                            <img style={{height:'150px',width:"100%"}} src={value.image} alt="mainImage"/>
                        </div>
                    </div>
                    <div  id="like" className = "likeImage">
                    {  
                             this.state.email!==''  && this.state.activeUserLike.length!==0 && this.state.activeUserLike.find((element) =>element.id === value._id)!==undefined ?
                            (
                                <React.Fragment>
                                    <center>
                                        <img onClick = {()=>this.handleLike(value._id)} style={{height:'50%',width:"50%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcEsudPG7eBaMlFSBSfvVzecaIGenCdeczbLfTQz9i_nYgSNOP&s" alt="like image"/>
                                        <p className = "descriptionsLikes">{value.likesCount} likes</p>
                                    </center>
                                </React.Fragment>
                            ):
                            (
                                <React.Fragment>
                                      
                                    <center>
                                        <img onClick = {()=>this.handleLike(value._id)} style={{height:'50%',width:"50%"}} src="data:image/png;base64,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" alt="like image"/>
                                        <p className = "descriptionLikes">{value.likesCount} likes</p>
                                    </center>
                                </React.Fragment>
                            )
                    }
                 </div>
			    </div>
             
                {this.state.goToDisciption===true  && value._id ===this.state.Discription._id  ?<StartUpDescription id = {this.state.Discription._id} /> : null}
            </div>//map end.
        )):
        (
            <h4>Loading..</h4>
        )
        
        )
        
    }
    
}

export default StartUp
