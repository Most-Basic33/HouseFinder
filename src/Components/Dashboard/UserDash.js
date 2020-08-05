import React, { useState, useEffect } from 'react'
import service from '../../service'
import './Dashboard.css'
import { connect } from 'react-redux'


const UserDash = (props) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])


    const deleteUser = (id) => {
        if (props.user.isadmin === true) {
            service.removeUser(id)
                .then(res => {
                    setUsers(res.data)
                    getUsers(res.data)
                })
        }
    }


    const getUsers = () => {
        service.getUser()
            .then((res) => {
                setUsers(res.data)
            })
    }


    const mappedUsers = users.map((users, index) =>
        <div>
            <div className='mapped1' key={index}>
            <ul>
                <p>ID: {users.id}</p>
                <p>Name: {users.name}</p>
                </ul>
                <ul>
                <p>Address: {users.address}</p>
                <p>Income: {users.income}</p>
                </ul>
            </div>
            <button className='user' onClick={() => deleteUser(users.id)} >Delete X</button>
        </div>
    )


    return (
        <div className='dash-box'>{mappedUsers}</div>
    )
}


export default connect(state => state)(UserDash)