import React, { useState } from 'react'
import service from '../../service'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducer'
import { Link } from 'react-router-dom'
import './Auth.css'


const AuthLogin = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setUser] = useState('')

  const login = () => {
    let body = { email, password }
//service.login(body)
axios.post(`/api/login`,body)
      .then(res => {
        // console.log(res.data)
        setUser(res.data)
        props.getUser(res.data)


        props.history.push('/dash')


      })

  }
     const proceedAsGuest=()=>{
       const {history} = props;
       history.push('/dash')
     }
  return (
    <form>
      <div id='top'>
        <h1 id='big' >Home Finder</h1>
        <div id="Login__parent">
          <div id="Login__child">

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
            <button className='Login__btn' onClick={login} >Login</button>
            <br></br>
            <Link to='/register'> <button className='Login_btn' >Register Now!</button></Link>
            <br></br>
            <span id='text'  onClick={proceedAsGuest} >Proceed AS Guest</span>
                  </div>
        </div>
      </div>
      <div></div>
    </form>
  )
}
const mapStateToProps = reduxState => reduxState



export default connect(mapStateToProps, { getUser })(AuthLogin)