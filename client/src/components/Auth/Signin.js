import React, { Component } from 'react'
import { SignIn_User } from '../../queries'
import {Mutation} from 'react-apollo' 

const initialState = {
    username: "",
    password: ""
}

class Signin extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {  ...initialState  }
    }

    handleChange = (event) => {
        const { name, value} = event.target
        this.setState({
            [name] : value
        })
    }
    
    clearState = () => {
        this.setState({ ...initialState })
    }

    validateForm = () => {
        const {username, password} = this.state
        const isValid = !username || !password
        return isValid
    }

    handleSubmit = (event, signInUser) => {
        event.preventDefault()
        signInUser().then(({data}) => {
            console.log(data.signInUser.token)
            localStorage.setItem('token', data.signInUser.token)
            this.clearState()
        })
    }

    render() {

        const {username, password} = this.state

        return (
                <div className="container mx-5 px-5 mx-auto my-5 ">
                    <h4 className="text-center my-5 font-weight-bold">SignIn</h4>
                    <Mutation mutation={SignIn_User} variables={{username,password}}> 
                        {
                            (signInUser,{data,loading,error})=>{
                                return (
                                    <form onSubmit={event => {this.handleSubmit(event,signInUser)}}>
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input type="text" className="form-control" value={username} onChange={this.handleChange} name="username"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" className="form-control" value={password} onChange={this.handleChange} name="password"/>
                                        </div> 
                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label">Remember me</label>
                                            <label className="form-check-label float-right">Forgot password</label>
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

export default Signin
