import React from 'react';
import { withRouter } from 'react-router-dom'
import Header from './Components/Header/Header'
import routes from './routes'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';




toast.configure()

function App(props) {

  return (
    <div className="App">
      <main className='main-view' >
<div className='div-head'>
        {props.location.pathname === '/' || props.location.pathname === '/register' ? null : <Header
          className='header1'
        />}
         </div>
         <div className='div-route' >
        {routes}
        </div>
      </main>
    </div>
  );
}

export default withRouter(App);
