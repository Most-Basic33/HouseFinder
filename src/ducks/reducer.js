import service from '../service'


const initialState = {
    user: {},//Users/ or user logged me
    homes: [],// lets of all jome sin are 
    cart: [],
    members: []

}

const GET_USERS = 'GET_USERS'
const REQUEST_HOUSE_DATA = 'REQUEST_HOUSE_DATA'
const GET_USER = 'GET_USER'
const GET_CART = 'GET_CART'


export function getUsers() {
    const info = service.getUser()
   // console.log(info)
    return {
        type: GET_USERS,
        payload: info
    }
}

export function requestHomes() {
    const data = service.getAll()

    return {
        type: REQUEST_HOUSE_DATA,
        payload: data
    }
}
export function getCart(cartObj) {
    console.log(cartObj)
    return {
        type: GET_CART,
        payload: cartObj
    }
}

export function getUser(userData) {

    //console.log(userData)
    return {
        type: GET_USER,
        payload: userData
    }

}


export default function reducer(state = initialState, action) {
    const { type, payload } = action
   // console.log(state,"line56")
    switch (type) {
        case GET_USERS + '_PENDING':
            //   console.log(payload)
            return state;
        case GET_USERS + '_FULFILLED':
           // console.log(payload,"line 60")
            return { ...state, members: payload.data  }
        case GET_USERS + '_REJECTED':
            return state;
        case REQUEST_HOUSE_DATA + '_PENDING':
            //   console.log(payload)
            return state;
        case REQUEST_HOUSE_DATA + '_FULFILLED':
            //    console.log(payload.data)
            return { ...state, homes: payload.data }
        case REQUEST_HOUSE_DATA + '_REJECTED':
            return state;
        case GET_USER:
           // console.log(payload)
            return { ...state, user: payload }
        case GET_CART:
            return { ...state, cart: payload }
        default:
            return state
    }
}

