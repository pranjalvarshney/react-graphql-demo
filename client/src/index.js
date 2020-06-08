import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-boost"
import {ApolloProvider} from 'react-apollo'
import Signin from "./components/Auth/Signin"
import Signup from "./components/Auth/Signup"
import 'bootstrap/dist/css/bootstrap.css'
import withSession from './components/Auth/withSession'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  
  // for sending auth token to the server

  fetchOptions: {                             
    credentials: 'include'
  },
  request: operation => { 
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({ networkError }) => {
    if(networkError){
      console.log('Network Error',networkError)
     
    }
  }
  
})

const Root = () => ( // implicit return
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Redirect to="/" />
    </Switch>
  </Router>
)

const RootWithSession = withSession(Root)

ReactDOM.render(

  <React.StrictMode>
    <ApolloProvider client={client}>
      <RootWithSession />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
