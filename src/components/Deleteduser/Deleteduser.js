import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import {  addUser, deleteRestored } from '../../redux/user/UserSlice';



export default function Deleteduser({setvisible}) {
  const deleteddata=useSelector(state=>state.user.deletedUsers)
  const dispatch=useDispatch()

  const handleRestore=(data,index)=>{
    dispatch(addUser(data))
    dispatch(deleteRestored(index))
  }

  return (
    <div style={{width:"100%",position:"absolute",top:"20%",left:"50%",transform:"translate(-50%,-50%)"}}>
    <TableContainer  component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Mobile</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
          {deleteddata.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.mobile}</TableCell>
              <TableCell align="center">
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"20px"}}>
                  <Button variant='contained' onClick={()=>handleRestore(row,index)}>Restore</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}