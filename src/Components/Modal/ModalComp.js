import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { requestHomes } from '../../ducks/reducer'
import './ModalComp.css'

Modal.setAppElement('#root')

// const setModal=()=>{
//     setModalOpen(!modalOpen)
// }

const ModalComp = (props) => {
    console.log()

    let { home, index, deleteHomes, addCart, editMode } = props

    //console.log(home.id)
    //console.log(props.modalOpen)

    return (
        <div >
            <Modal
                isOpen={home.id === props.modalOpen}
                onRequestClose={() => props.setModal(0)}
                style={{
                    overLay: {
                        backgroundColor: '#ac6291'
                    }
                }}>
                <div key={index} className='modal'>
                    <div id='propDetailsHolder'>
                        <div id='idk' >
                            <div id='propDeatilsOne' >
                                <ul>
                                    <p><b>Home ID:</b> {home.id}</p>
                                    <p><b>Property Type:</b> {home.name}</p>
                                    <p><b>Property Address:</b> {home.address}</p>
                                </ul>
                            </div>

                            <div id='propDetailsTwo' >
                                <ul>
                                    <p><b>City:</b> {home.city}</p>
                                    <p><b>State: </b>{home.state}</p>
                                    <p><b>Zip:</b> {home.zip}</p>
                                </ul>
                            </div>

                            <div id='propRentHolder'>
                                <h3><b>Rent:</b> ${home.desired_rent}</h3>
                            </div>
                        </div>

                        <div id='propImgHolder'>
                            <img id='photo22' src={home.photo}   alt='preview' />
                        </div>

                        <div id='space'>
                            {props.user.isadmin ? <button id="buttons" onClick={() => deleteHomes(home.id)}>Delete</button> : null}

                        </div>
                    </div>

                    <div id='modemode'>
                        <div id='modalButtons' >
                            <button id='close' onClick={(e) => { props.setModal(-1, e) }}>Close</button>
                            {props.user.isadmin ? <button onClick={() => editMode(home.id)} id='cart'>Update Price</button> : <button id='cart1' onClick={(e) => { props.sendEmail(); addCart(home); props.notify(); props.setModal(-1, e) }} >Email Realtor!</button>}

                        </div>
                    </div>
                </div>
            </Modal>
        </div >
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



export default connect(mapStateToProps, { requestHomes })(ModalComp)

