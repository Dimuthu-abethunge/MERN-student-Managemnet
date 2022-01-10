import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
    submit: {
      width: '120px',
      height: '40px',
      color: 'black',
      float: 'right',
      fontSize: '18px',
      fontWeight: 'bolder',
      borderRadius: 15,
    },

    bar: {
        position: 'fixed',
        height: '10%',
        background: '#F5F5F5',
        textAlign: 'center',
        color: 'black',
        fontSize: '18px',
        fontWeight: 'bolder',
        margin: ''
    }
}));

const Header = () => {

    const classes = useStyles();
    
    const userType = localStorage.getItem('userType');



    return (
        
        <Fragment>
            <AppBar className={classes.bar}>
                <Grid container direction="row" alignItems="center">
                <h1>{

                    userType==0 ? 'Teacher Dashboard': (userType==1 ? 'Admins Dashbord' : 'Student Dashboard' )
                    
                    
                    }</h1>
                  
                </Grid>
            </AppBar>
            
        </Fragment>
    );
};

export default Header;