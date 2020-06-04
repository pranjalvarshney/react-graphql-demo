import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-boost"
import {ApolloProvider} from 'react-apollo'
import Signin from "./components/Auth/Signin"
import Signup from "./components/Auth/Signup"


import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'    
})

const Root = () => ( // implicit return
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Redirect path="/" />
    </Switch>
  </Router>
)

ReactDOM.render(

  <React.StrictMode>
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
