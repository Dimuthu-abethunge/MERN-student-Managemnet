import React, { Fragment, useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import './sidenav.css';
import { Button } from '@material-ui/core';

import {
    BrowserRouter as Router, 
    Switch, 
    Route,
    Link, 
    Redirect,
    useHistory
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    
    submit: {
      width: '140px',
      height: '40px',
      fontSize: 18,
      fontWeight: 700,
      borderRadius: 20,
    },
}));

const SideNav = () => {

    const classes = useStyles();

    const [expand1, setExpand1] = useState(false);
    const [expand2, setExpand2] = useState(false);
    const [expand3, setExpand3] = useState(false);
    const [expand4, setExpand4] = useState(false);
    const [expand5, setExpand5] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };

    async function isAuth(){
        try {
          
          const response  = await fetch("http://localhost:5000/admin/smartride/is-verify", {
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

    let history = useHistory();

    return (
        <Fragment>
            <div className="side-menu">


                <div className="main-menu">
                    <ul>

                        <li>
                            <a className="menu-item" onClick={() => {history.push("../system/addStudent");}}>
                                <div className="menu-icon">
                                    <AddIcon />
                                </div>
                                Add Students
                            </a>
                        </li>

                        <li>
                            <a className="menu-item" onClick={() => {history.push("../system/viewStudent");}}>
                                <div className="menu-icon">
                                    <ListIcon/>
                                </div>
                                View Students
                            </a>
                        </li>

                    </ul>
                </div>

                <div className="side-menu-footer">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="default"              //// have to check path
                        className={classes.submit}
                        onClick={ () => {history.push("../profile");}}
                    >
                        <PersonIcon />
                        Profile
                    </Button>
                   
                </div>

                <div className="side-menu-footer">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="default"              //// have to check path
                        className={classes.submit}
                        onClick={ () => {
                            localStorage.removeItem("token");
                            setAuth(false);
                            window.location.reload();
                            history.push("/");
                        }}
                    >
                        Logout
                    </Button>
                    {/* <button onClick={ e => logout(e)}>Log Out</button> */}
                </div>
                
            </div>
        </Fragment>
        
    );
};

export default SideNav;