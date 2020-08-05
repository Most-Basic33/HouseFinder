import React, { useEffect, useState } from 'react'
import './Search.css'
import { connect } from 'react-redux'
import { getUsers, getCart } from '../../ducks/reducer'

const SearchHomes = (props) => {
    const [homeName, setHomeName] = useState('')
    const [foundHome, setFoundHome] = useState([])
    const [cart, setCart] = useState('')

    useEffect(() => {
        if (cart !== undefined) props.getCart(cart);
        props.getUsers();
    }, [cart])

    // const findHouse=()=>{
    //     let found = props.homes.find(ele=>ele.name === homeName)
    //     console.log(found)
    //     found?setFoundHome([found]):setFoundHome(['Not Found'])
    //     !found?setCart([]):setCart(found)   
    //     }

    const findHouse = () => {
        let found = [];
        found = props.homes.filter(home => home.name.toLowerCase().includes(homeName.toLowerCase()))
            .map((e, i) => {
                return e
            })
        console.log(found[0])
        found.length > 0 ? setFoundHome([found[0]]) : setFoundHome(['Not Found'])
        !found ? setCart([]) : setCart(found[0])

    }

    const mappedHomes = foundHome.length === 0 ? null :

        foundHome.map((home, index) =>
            <div key={index} >
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

    console.log(props)
    return (
        <div className='page'>

            <h3 id='something' >Search Homes by Name</h3>
            <button onClick={findHouse} >Search Homes</button>
            <input
                type='text'
                required
                name='homeName'
                placeholder='Search by Name'
                onChange={(e) => setHomeName(e.target.value)}

            />
            {mappedHomes}

        </div>
    )
}
const mapStateToProps = reduxState => {
    return {
        homes: reduxState.homes,
        members: reduxState.users,
        cart: reduxState.cart
    }
}

export default connect(mapStateToProps, { getUsers, getCart })(SearchHomes)