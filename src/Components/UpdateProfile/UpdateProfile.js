import React, {useState} from 'react'
import service from '../../service'
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'


const UpdateProfile=(props)=>{
    const [age, setAge] = useState('')
    const [income, setIncome] = useState('')
    const [married, setMarried] = useState('')
    const [employed, setEmployed] = useState('')
    const [email, setEmail] = useState('')
    
const update = () => {
let body = {age,income,married,employed,email};
   let id = props.user.id
    service.update(id,body)
    .then(()=>{
       console.log('completed') 
     props.history.push('/dash')
    })
}
console.log(married)
console.log(employed)
    return(
        <div>
        <button onClick={update} >Update Profile</button>
        <form onSubmit={update} >
 Age:
    <input
    type='number'
    name='age'
    placeholder='age'
    required
    onChange={(e)=>setAge(e.target.value)}
     />
    Income:
     <input
    type='number'
    name='income'
    placeholder='income'
    required
    onChange={(e)=>setIncome(e.target.value)}
     />
     
     <label htmlFor='married'>Are You Married Yes/No:</label>
     <select id='married' onChange={(e)=>setMarried(e.target.value)} >
         <option value='yes' >Yes</option>
         <option value='no'>No</option>
     </select>
    
     <label htmlFor='employed'>Are You Employed Yes/No:</label>
     <select id='employed' onChange={(e)=>setEmployed(e.target.value)} >
         <option value='yes'>Yes</option>
         <option value='no'>No</option>
     </select>
     Email:
     <input
    type='email'
    name='email'
    required
    placeholder='email'
    onChange={(e)=>setEmail(e.target.value)}
     />
        </form>
       <Link to='/dash'> <button>Return to Dash</button> </Link>
        </div>
    )
}
const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(UpdateProfile)