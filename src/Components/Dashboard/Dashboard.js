import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import service from '../../service'
import { connect } from 'react-redux'
import { requestHomes, getCart } from '../../ducks/reducer'
//import Modal from 'react-modal'
 import ModalComp from './../Modal/ModalComp'
 import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
 

const Dashboard = (props) => {
    const initalState ={
        edit:false,
        modalOpen:false
    }   
    
    
    const [, setHouse] = useState([])
    const [cart, setCart] = useState({})
    const [price, setPrice] = useState('')
    const [id, setId] = useState('')
    const [edit, setEdit] = useState(initalState)
    let [modalOpen, setModalOpen] = useState(0)
    //console.log(props.homes)

    useEffect(( ) => {
        getHomes()
     // setCart(obj)

    }, [cart])


    const notify = () =>{
       if(props.user.id){
        toast.success(`You're email got sent to the realator...wait for da call`)
       }else{
           toast.error('Either Log in or go back and register before you can send an email...duh')
       }
      }

      const speak=( )=>{
          
            toast.success('You have Sucessfully updated the price')
         
      }
       
    const deleteHomes = (id) => {
        if (props.user.isadmin === true) {
            service.remove(id)
                .then(res => {
                    setHouse(res.data)
                    getHomes()
                    toast.update(`Home Deleted`)
                })
        } else {
            alert('Must be boss level or above to do that!')
        }
    }
 const editMode=(id)=>{
     setEdit(!edit)
     setId(id)

 }
    const updatePrice = (id)=>{
         service.updatePrice(id, price)
         .then( ()=>{
            getHomes()
            speak()
         })
        //alert('Need credentials for that playa')
        editMode()
    }
     
    const sendEmail = () => {
        if (props.user.id) {
        const userEmail = props.user.email;
        const text = JSON.stringify(cart)
        const subject = props.user.id;
        console.log(userEmail)
        
       // const houseID = cart.id
        console.log(text)
        console.log( subject)
        service.email({userEmail, subject, text})
            .then(() => {
                // removed cart from here....
               
            }).catch(err => console.log(err, 'ooopps....'))
        }
            else {
                alert('You must be logged in to do that champ...Go back and Register!')
           }
    }

    const getHomes = () => {
        props.requestHomes()

    }


    const addCart = (obj) => {
           setCart(obj)
            props.getCart(obj)
            if(props.user.id){
         //sendEmail();
            }
    }


 
     
const setModal=(id, e)=>{
    e.stopPropagation()
    setModalOpen(id)
}



//console.log(props )
    const mappedHouses = props.homes.map((home, index) => {
        return (
          
         <div onClick={(e)=>{addCart(home);setModal(home.id, e )}}  key={index} className='mapped'>
         <ModalComp 
          index={index}
          home={home}
          deleteHomes={deleteHomes}
           addCart={addCart}
          editMode={editMode}
          modalOpen={modalOpen}
          setModal={setModal}
          notify={notify}
          sendEmail={sendEmail}
           />
           <div id='butty'>
      {props.user.isadmin ? <button onClick={() => editMode(home.id)} id='cart'>Update Price</button> : <button id='cart' onClick={() =>{console.log(home); addCart(home)}} >Email Realtor!</button>}
      {props.user.isadmin ? <button id="buttons" onClick={() => deleteHomes(home.id)}>Delete</button> : null}
</div>
                    <ul className='list1'> 
                    
                        <p><b>Home ID:</b>{home.id}</p>
                        <p><b>Property Type:</b> {home.name}</p>
                        <p><b>Property Address:</b> {home.address}</p>
                    </ul>
                    <ul className='list2'>
                        <p><b>City:</b> {home.city}</p>
                        <p><b>State:</b> {home.state}</p>
                        <p><b>Zip: </b>{home.zip}</p>
                    </ul>

                    <h3 className='rents'><b>Rent: $</b>{home.desired_rent}</h3>
                    <img className='photo' src={home.photo} alt='preview' />
                    
                
                 
                </div>
        )
    })


    //console.log(mappedHouses)
    return (
        <div className='dash-box'>
            <header className='header-2'>
            <div id='map-div'>
            <Link to='/map'> <button id='mappy' >View Maps</button></Link>
            </div>
            <div id='header-slogan' >
            Find Your Home Today User:{props.user.id}
            </div>
            <div id ='link-button'>
            {props.user.isadmin ? <Link to='/wizard'>
            <button id='button1'>Add New Property</button>
            </Link> : null}
            </div>
            
            </header>
            
            <div className='content'>

            {!edit?<div> 
            <input
            type='text'
            name='price'
            placeholder='Update Rent'
            required
            onChange={(e)=>setPrice(e.target.value)}
             />
             <button onClick={()=>updatePrice(id)} >Update</button>
             </div>:<div>
            {mappedHouses}</div> }
            <ToastContainer 
            

            />
            </div>

        </div>
    )
}


//export default Dashboard;
const mapStateToProps = state => {
    // console.log(state.user)
    return {
        user: state.user,
        homes: state.homes,
        cart: state.cart,

    }
}



export default connect(mapStateToProps, { requestHomes, getCart })(Dashboard)

