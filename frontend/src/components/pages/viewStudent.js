import { Grid } from '@material-ui/core';
import { toast } from 'react-toastify';

import React, { Fragment, useState ,Component, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SideNav from '../widget/sidenav';
import 'react-toastify/dist/ReactToastify.css';
import '../style/viewStudent.css';

toast.configure();

    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);


      const useStyles = makeStyles({
        table: {
          maxWidth: 600,
        },

        cell: {
            width: 150,
        }
      });

const ViewStudent = () => {

    const [studentList, setStudentList] = useState([]);
  
    async function getStudent() {
      const res = await fetch("http://localhost:5000/student/view");

      const studentArray = await res.json();

        setStudentList(studentArray);
      
  
    };

    
    useEffect(() => {
      getStudent();
    
    }, []);



    const classes = useStyles();

    return(
        <Fragment>
            <div className="body">
               
                <SideNav />

                <div className="view_bus_container">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell className={classes.cell} align="center">Student ID</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Student Name</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Class</StyledTableCell>
                                    <StyledTableCell className={classes.cell} align="center">Mobile Number</StyledTableCell>
                                </TableRow>
                            </TableHead>

                              <TableBody>
                                {studentList.map((row) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell className={classes.cell} align="center" component="th" scope="row">{row.student_id}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.student_name}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.class}</StyledTableCell>
                                        <StyledTableCell className={classes.cell} align="center">{row.mobile_number}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                
                              </TableBody>
                            
                              
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Fragment>
    );
};

export default ViewStudent;