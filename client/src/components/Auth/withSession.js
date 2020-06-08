import React from 'react'
import {Query} from 'react-apollo'
import { getCurrent_User } from '../../queries'

const withSession = Component => props => (
    <Query query={getCurrent_User}>
        {({data,loading})=> {
            
            if(loading) return null
            console.log(data)
            return (
                <Component {...props}/>
            )
        }}
    </Query>
)

export default withSession