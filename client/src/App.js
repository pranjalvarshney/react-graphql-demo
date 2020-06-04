import React from 'react'
import { getALLRecipe } from './queries/index'
import { Query } from 'react-apollo'

function App() {
  return (
    <div>
      <h1>Home</h1>
      <Query query={ getALLRecipe }>
        {
          ({data, loading, error})=>{
            console.log(data)
            if(loading) return <div>Loading ...</div>
            if(error) return <div>Error</div>
            
            return <div>Recipes</div>
           }
        }
      </Query>
    </div>
  )
}

export default App
