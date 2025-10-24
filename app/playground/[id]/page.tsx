"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const MainPlaygroundPage = () => {
    const {id} = useParams<{id:string}>();
  return (
        <div>
            params : {id}
        </div>
  )
}

export default MainPlaygroundPage



//iss params id se kya hoga ?
/*

The code defines a React component called MainPlaygroundPage that uses the useParams hook from Next.js to extract the id parameter from the URL. When this component is rendered, it will display the text "params : " followed by the value of the id parameter.
next we need to select the template and then convert it to the json format and then we can use it in playground





*/