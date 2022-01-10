import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style/login.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

toast.configure();

const useStyles = makeStyles((theme) => ({
    selectEmpty: {
        marginTop: theme.spacing(1),
        width: 200,
        display: 'flex',
        flexWrap: 'wrap',
    },
    list: {
        display: 'inline',
        margin: 2,
    }
}));


const Login = ({ setAuth }) => {

    
    

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
   });

   const [userType, setuserType] = useState({});

    const {email, password} = inputs;


    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    };

    const usechange = (event) => {
        setuserType(event.target.value);
    };



    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {

            //admin teacher

            if(userType==0 || userType==1){
                localStorage.setItem('userType', userType);
                const body = { email, password,userType };

                const response = await fetch("http://localhost:5000/basic/login", {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body)
                });
    
                const parseRes = await response.json()
    
                if(parseRes.token) {
                    //console.log(parseRes);
                    localStorage.setItem("token", parseRes.token);
                    setAuth(true);
    
                    toast.success("LogIn Successfully");
                }else{
                    setAuth(false)
                    toast.error(parseRes)
                }
            }
             //student
            else{
                localStorage.setItem('userType', userType);
                const body = { email, password };
                //console.log(body);

                const response = await fetch("http://localhost:5000/student/login", {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body)
                }); 
    
                const parseRes = await response.json() 
    
                if(parseRes.token) {
                    //console.log(parseRes);
                    localStorage.setItem("token", parseRes.token);
                    setAuth(true);
    
                    toast.success("LogIn Successfully");
                }else{
                    setAuth(false)
                    toast.error(parseRes)
                }
            }
            

        } catch (err) {
            console.error(err.message);
        }
    }

    const classes = useStyles();
    
    return(
        <Fragment>
            <div className="body">
                <div className="backgroundImglogin"></div>
                <div className="f_container">
                    <h1>Login</h1>
                    <form onSubmit={onSubmitForm}>
                        <div className="form-row">
                            <div className="col-75">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    name="email" 
                                    placeholder="enter email"
                                    value={email}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-75">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="enter passwrod"
                                    value={password}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-75">
                                <label>user type</label>
                               
                                <Select 
                                    className={classes.selectEmpty}
                                    value={userType}
                                    onChange = {usechange}
                                    required
                                >
                                    <MenuItem className={classes.list} value="0"><em>Teacher</em></MenuItem>
                                    <MenuItem className={classes.list} value="1"><em>Admin</em></MenuItem>
                                    <MenuItem className={classes.list} value="2"><em>Student</em></MenuItem>
                                 
                                </Select>
                            </div>
                        </div>

                        <button>Sign In</button>
                        <div className="reg">
                            <h4><b>Create Account ?</b></h4>
                            <div className="reg-link">
                                <Link to="/system/register" style={{ textDecoration: 'none', color: '#1e90ff' }} >Here</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};


export default Login;