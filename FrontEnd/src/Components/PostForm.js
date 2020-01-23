import React, { Component } from 'react'
import axios from  'axios'
 class PostForm extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              userId : '',
              title : '',
              body : ''
         }
     }
     handleChange = event =>{
         this.setState({[event.target.name] : event.target.value})
     }
     submitHandle = event =>{
        //  event.preventDefault()
        //  console.log(this.state)
         axios.post('https://jsonplaceholder.typicode.com/posts',this.state)
         .then(response =>{console.log(response)})
         .catch(error => {console.log(error)})
     }
    render() {
        return (
            <div>
                <form onSubmit = {this.submitHandle}>
                    <input type="text" value = {this.state.userId} name="userId" onChange = {this.handleChange}></input>
                    <input type="text" value = {this.state.title} name="title" onChange = {this.handleChange}></input>
                    <input type="text" value = {this.state.body} name="body" onChange = {this.handleChange}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default PostForm
