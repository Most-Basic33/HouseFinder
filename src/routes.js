import React from 'react'
import {Switch, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'
import AddHouse from './Components/AddHouse/AddHouse'
import Auth from './Components/Auth/Auth'
import AuthLogin from './Components/Auth/AuthLogin'
import UpdateProfile from './Components/UpdateProfile/UpdateProfile'
import UserDash from './Components/Dashboard/UserDash'
import Search from './Components/Search/Search'
import SearchHomes from './Components/Search/SearchHomes'
import MapContainer from './Components/Map/MapContainer'

export default (
    <Switch>
      <Route component={AuthLogin} exact path ='/' />
      <Route component={UserDash} path='/user' />
      <Route component={SearchHomes} path='/find'  />
      <Route component={Auth} path='/register' />
        <Route component={Dashboard}  path ='/dash' />
        <Route component={AddHouse} path='/wizard'/>
        <Route component={Search} path='/search' />
        <Route component={UpdateProfile} path='/update' />
        <Route component={MapContainer} path='/map'/>
    </Switch>

)