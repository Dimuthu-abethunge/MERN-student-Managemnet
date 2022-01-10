import { Button, Grid } from '@material-ui/core';
import React, {Fragment} from 'react';
import './style/dash.css';
import Header from './widget/header';
import SideNav from './widget/sidenav';

const Dashboard = ({ setAuth }) => {

    localStorage.getItem('userType');

    return(
        <Fragment>
            <div className="body">

                <Header />

                <SideNav />


                <div className="backgroundImgdash"></div>
                   
            </div>
        </Fragment>

        
        );
};


export default Dashboard;