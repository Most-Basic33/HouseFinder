import React, { useState, useEffect } from 'react'
import './Header.css'
import service from '../../service'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';
import { getUser } from '../../ducks/reducer'
//import { ToastContainer, Zoom } from 'react-toastify'
import { Doughnut } from 'react-chartjs-2'


const Header = (props) => {
     
    const [, setUser] = useState('')

    //tring to get the rent attribute from the cart object in redux
    const cost = props.cart.desired_rent || 0;
    const income = Math.round(props.user.income/12)
    const remainingMoney = (income-cost) >=0? (income-cost): 0
    const percent =  (cost/remainingMoney)*100
    const num = Math.round(percent)
    useEffect(() => {
        //logMeIn() 
        service.checkedLogged()
            .then(res => {
                setUser(res.data)
                props.getUser(res.data)
                props.history.push('/dash');
            }).catch(err => {
                console.log(err) })
    }, [])
//trying to get my project to update when income/or user changes
    useEffect(()=>{

    },[props.user])


    const logout = () => {
        service.logout()
            .then(
                props.history.push('/')
            )
    }

    const linkTo = () => {
        if (props.user.id) {
            props.history.push('/update')
        } else {
            alert('You gotta be logged in for that!!!!!')
            //notify()
        }
    }

    return (
        <div id='header1' >
            <div>
                <div>
                    <h2>Home Finder</h2>
                    <p>Welcome-{props.user.name}</p>
                    <p>{props.user.isadmin ? 'Boss' : null}</p>
                    <button id='logout' onClick={() => logout()} >Logout</button>
                    <button onClick={linkTo} id='update' >Update Profile</button>
                    <div>
                        <h6>Income: ${props.user.income} </h6>
                    </div>
                </div>
                <div id='cart-box'>
                    <h3 >{props.cart.id?`House ID# ${props.cart.id}`:'Cart: []'}</h3>
                    <h4> Cost:${props.cart.desired_rent} </h4>
                </div>
                {!props.user.isadmin && props.user.id ? <Link to='/find' ><button id='search-butt'  >Search Homes</button></Link> : null}
                {props.user.isadmin ? <Link to='/user'><button id='button-id' >View Profile's</button></Link> : null}
            </div>
            {props.user.id? <Link to='/dash'><button id='button-id' >Dashboard</button></Link> : null}
            {props.user.isadmin ? <Link to='/search'><button>Admin Search</button></Link> : null}
            Baller Gauge
            {num}%
<Doughnut id='doughnut' data= {{
    
    labels: [
       
        'Monthly Income',
        'Remainder'
       
    ],
    datasets: [{
        data: [income,remainingMoney],
        backgroundColor: [
            '#C82233',
            '#72C934',
        ],
        hoverBackgroundColor:[
            '#C82299',
            '#72C999',
        ]
    }]
}} />
         
        </div>
    )
}
const mapStateToProps = state => {
    // console.log(state.user)
    return {
        user: state.user,
        homes: state.homes,
        cart: state.cart
    }
}

export default withRouter(connect(mapStateToProps, { getUser })(Header)); 