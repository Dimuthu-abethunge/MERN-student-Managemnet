import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import React, { Fragment, useState ,useEffect} from 'react';

import SideNav from '../widget/sidenav';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import '../style/addStudent.css';
import 'react-toastify/dist/ReactToastify.css';

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

const AddStudent = () => {
    
    //define inputs and db fetch
    const [inputs, setInputs] = useState({
        stu_name: "",
        stu_id: "",
        stu_grade: "",
        stu_mobile: "",
        stu_email: "",
        
    });
    

   const {stu_name,stu_id,stu_grade,stu_mobile,stu_email} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]
        : e.target.value})
    };



    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {

            const body = {stu_name,stu_id,stu_grade,stu_mobile,stu_email};
          
            const response = await fetch("http://localhost:5000/student/add", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()

            if(parseRes){
                //console.log(parseRes);
                window.location.reload();
                toast.success("Registered Successfully");
            }else{
                
                toast.error(parseRes)
            }
            

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
     
    }, []);

    const classes = useStyles();

    return(
        <Fragment>
            <div className="body">
                {/* <Grid> */}
                
                {/* </Grid> */}
                {/* <Grid> */}
                    <SideNav />
                {/* </Grid> */}
                {/* <Grid> */}

                    <div className="add_bus_container">
                    <h2>Student Register</h2>
                    <form onSubmit={onSubmitForm}>
                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Student Name</label>
                                <input 
                                    type="text" 
                                    name="stu_name" 
                                  //  placeholder="stu_name"
                                    value={stu_name}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Student ID</label>
                                <input 
                                    type="text" 
                                    name="stu_id" 
                                   // placeholder="stu_id"
                                    value={stu_id}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Grade</label>
                                <input 
                                    type="text" 
                                    name="stu_grade" 
                                   // placeholder="stu_grade"
                                    value={stu_grade}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Mobile Number</label>
                                <input 
                                    type="text" 
                                    name="stu_mobile" 
                                  // placeholder="stu_mobile"
                                    value={stu_mobile}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="add-form-row">
                            <div className="col-75">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    name="stu_email" 
                                
                                    value={stu_email}
                                    onChange = {e => onChange(e)}
                                    required
                                />
                            </div>
                        </div>

                        

                        

                        <div className="btn_box">
                            <button className="bus_update_btn">Register</button>
                        </div>
                        
                        
                    </form>
                        
                    </div>
                
            </div>
        </Fragment>
    );
};

export default AddStudent;