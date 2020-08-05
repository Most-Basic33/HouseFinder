import React, { useEffect, useState } from 'react'
import './Search.css'
import { connect } from 'react-redux'
import { getUsers } from '../../ducks/reducer'


const Search = (props) => {
const tog = {
    toggle:false
}
    const [cart, setCart] = useState('')
    const [userName, setUserName] = useState('')
    const [foundUser, setFoundUser] = useState([])
    const [homeName, setHomeName] = useState('')
    const [foundHome, setFoundHome] = useState([])
    const [toggle, setToggle] = useState(false)
    const [toggleUser, setToggleUser] = useState(false)
    useEffect(() => {
        console.log('hit')


        props.getUsers()
    }, [cart])

// useEffect(() =>{
//     console.log('hit2')
// }, [toggle])
  
    // const findUser = () => {
    //     let found = props.members.find(ele => ele.name === userName)
    //     found ? setFoundUser([found]) : setFoundUser(['Not Found'])
    //     console.log(found)
    //     toggled()
    //     clear()
    // }
    const findUser = () => {
        let found = [];
        found = props.members.filter(member => member.name.toLowerCase().includes(userName.toLowerCase()))
            .map((e, i) => {
                return e
            })
        console.log(found[0])
        found ? setFoundUser([found[0]]) : setFoundUser(['Not Found'])
         if(toggle){
             setToggle(!toggle)
         }
        setToggleUser(!toggleUser)
       clear()

    }
    const clear = () => {
        setHomeName('')
        setUserName('')
    }
    // const findHouse=()=>{
    // let found = props.homes.find(ele=>ele.name === homeName)
    // found?setFoundHome([found]):setFoundHome(['Not Found'])
    // !found?setCart([]):setCart(found)
    // console.log(found)
    // toggled()
    // clear()
    // }
    const findHouse = () => {
        let found = [];
        found = props.homes.filter(home => home.name.toLowerCase().includes(homeName.toLowerCase()))
            .map((e, i) => {
                return e
            })
        console.log(found[0])
        found ? setFoundHome([found[0]]) : setFoundHome(['Not Found'])
        !found ? setCart([]) : setCart(found)
        if(toggleUser){
setToggleUser(!toggleUser)
        }
       setToggle(!toggle)
        clear()

    }



    const mappedUsers = foundUser.map((user, index) =>{  
         console.log(user)
    
        return (<div key={index}>
            {/* {Object.values(user)} */}
            <p>Id: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Address: {user.address}</p>
            <p>Income: {user.income}</p>
            <p>Admin: {user.isadmin === true ? 'Boss Status' : 'False'}</p>


        </div>
    )
    }
    )
        

    const mappedHomes = foundHome.map((home, index) =>
        <div key={index} >
            {Object.values(home)}
            <p>Id: {home.id} </p>
            <p>Name: {home.name}  </p>
            <p>Address: {home.address} </p>
            <p>City: {home.city}  </p>
            <p>State: {home.state}  </p>
            <p>Zip: {home.zip} </p>
            <p>Rent: {home.desired_rent}</p>
            <img src={home.photo} alt='preview' />

        </div>
    )

   // console.log(props)
    return (
        <div className='page'>
            <div>
                <h3>Search Users by Name</h3>
                <button onClick={findUser} >Search Users</button>
                <input
                    type='text'
                    required
                    name='userName'
                    placeholder='Search by Name'
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>
            <div>
                <h3>Search Homes by Name</h3>
                <button onClick={findHouse} >Search Homes</button>
                <input
                    type='text'
                    required
                    name='homeName'
                    placeholder='Search by Name'
                    onChange={(e) => setHomeName(e.target.value)}

                />
            </div>
            <div id='search'>
                    {toggle  ?   mappedHomes  :null}
                    {toggleUser ? mappedUsers : null}
                <main>
                </main>
            </div>
        </div>
    )
}

const mapStateToProps = reduxState => {
    return {

        homes: reduxState.homes,
        members: reduxState.members,
        cart: reduxState.cart
    }
}

export default connect(mapStateToProps, { getUsers })(Search)