import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import MyProfile from './components/MyProfile';
import FindUsers from './components/FindUsers';
import UserDetail from './components/UserDetail';
import Index from './components/Index';
import SelectSong from './components/SelectSong';
import Upload from './components/Upload';


const routing = (
  <Router>
    <React.StrictMode>
      {/* <Header/> */}
        <Routes>
          <Route exact path = '/' element = { <Index/> } />
          <Route exact path = '/home' element = { <App/> } />
          <Route exact path = '/register' element = { <Register/> } />
          <Route exact path = '/login' element = { <Login/> } />
          <Route exact path = '/logout' element = { <Logout/> } />
          <Route exact path = '/myprofile' element = { <MyProfile/> } />
          <Route exact path = '/users' element = { <FindUsers/> } />
          <Route exact path = '/user' element = { <UserDetail/> } />
          <Route exact path = '/selectsong' element = { <SelectSong/> } />
          <Route exact path = '/upload' element = { <Upload/> } />
        </Routes>
    </React.StrictMode>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(routing);