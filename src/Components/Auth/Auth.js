import React, { useState } from 'react'
import service from '../../service'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducer'
import { Link } from 'react-router-dom'

const Auth = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')

  console.log(props)

  const register = () => {
    let body = { name, email, password }
    service.createUser(body)
      .then(res => {
        setUser(res.data)
        getUser(res.data)
        props.history.push('/')
      })
  }


  console.log(getUser(user))
  return (
    <form>
      <div id='top'>
        <h1 id='big' >Home Finder</h1>
        <div id="Login__parent">
          <div id="Login__child">
       
            <input
              className="Login__input"
              type="text"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}

            />
            <input className="Login__input"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input className="Login__input"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='Login_btn' onClick={register} >Register!</button>
            <br></br>
            <Link to='/' >  <button>Cancel</button> </Link>
         </div>
         
        </div>
      </div>
    </form>
  )
}
const mapStateToProps = reduxState => reduxState



export default connect(mapStateToProps)(Auth)