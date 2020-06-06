import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Add_New_User } from '../../queries'

const initialState = {
    username: "",
    email: "",
    password: "",
}

class Signup extends Component {

    constructor(props) {
        super(props)
    
        this.state = {...initialState}
    }
    
    clearState = () =>{
        this.setState({...initialState})
    }
    
    handleChange = event => {
        const { name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (event,signUpUser) =>{ 
        event.preventDefault()
        signUpUser().then(({data}) =>{
            console.log(data.signUpUser.token)
            localStorage.setItem('token', data.signInUser.token)
            this.clearState()
        })
        
    }
    validateForm = () => {
        const {username, email, password} = this.state
        const isInvalid = !username || !email || !password
        return isInvalid
    }

    render() {

        const  { username , email, password } = this.state

        return (
            <div className="container mx-5 px-5 mx-auto my-5 ">
                <h4 className="text-center my-5 font-weight-bold">SignUp</h4>
                <Mutation mutation={Add_New_User} variables={{username,email,password}}> 
                    {
                        (signUpUser,{data,loading,error})=>{
                            return (
                                <form onSubmit={event => {this.handleSubmit(event,signUpUser)}}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" className="form-control" value={username} onChange={this.handleChange} name="username"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input type="email" className="form-control" value={email} onChange={this.handleChange} name="email"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" value={password} onChange={this.handleChange} name="password"/>
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your details with anyone.</small>

                                    </div> 
                                    
                                    <button type="submit" disabled={loading || this.validateForm()} className="btn btn-primary w-100">Submit</button>

                                    
                                
                                </form> 
                            )        
                        }
                    }
                </Mutation>
            </div>
        )
    }
}

export default Signup
