import React, {Fragment, useState, useEffect} from 'react';
import './App.css';

import {
  BrowserRouter as Router, 
  Switch,
  Route, 
  Redirect,
  Navigate
} from "react-router-dom";

//components
 
import Login from "./components/login";
import Register from './components/register';
import Dashboard from './components/dashboard';
import AddStudent from './components/pages/addStudent';
import ViewStudent from './components/pages/viewStudent';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth(){
    try {
      
      const response  = await fetch("http://localhost:5000/basic/is-verify", {
        method: "GET",
        headers: { token : localStorage.token }
      });

      const parseRes = await response.json()

      console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true): setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    isAuth()
  })

  return(
    <Fragment>
      <Router>
        <div className="container">
            <Route 
              exact path="/" 
              render={props => 
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth}/>
                ) : (
                  // <Redirect to="/system/login" />
                  <Redirect to="/system/dashboard" />
                )
              } 
            />


            {/* register */}
            <Route 
              exact path="/system/register" 
              render={props => 
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth}/>
                ) : (
                  // <Redirect to="/system/login" />
                  <Redirect to="/" />
                )
              }
            />

            {/* dashboard */}
            <Route 
              exact path="/system/dashboard" 
              render={props => 
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth}/>
                ) : (
                  // <Redirect to="/system/login" />
                  <Redirect to="/" />
                )
              }
            />

            <Route 
              exact path="/system/addStudent" 
              render={props => 
                isAuthenticated ? (
                  <AddStudent {...props} setAuth={setAuth}/>
                ) : (
                  // <Redirect to="/system/login" />
                  <Redirect to="/" />
                )
              }
            />

          <Route 
              exact path="/system/viewStudent" 
              render={props => 
                isAuthenticated ? (
                  <ViewStudent {...props} setAuth={setAuth}/>
                ) : (
                  // <Redirect to="/system/login" />
                  <Redirect to="/" />
                )
              }
            />

        </div>
      </Router>
    </Fragment>
  )
}

export default App;