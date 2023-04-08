import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  addDeleteedUSer,
  deleteUser,
} from "../../redux/user/UserSlice";
import AdduserModal from "../Modals/AdduserModa";

export default function User({ setvisible }) {
  const users = useSelector((state) => state.user.user);
  const [handleOpen, sethandleOpen] = React.useState(false);
  const [isEdit, setisEdit] = React.useState(false);
  const[edittodata,setEdittodata]=React.useState()
  const [editIndex,seteditIndex]=React.useState()

  const dispatch = useDispatch();
  const handleEdit = (data, index) => {
    setEdittodata(data)
    seteditIndex(index)
    sethandleOpen(true);
    setisEdit(true)
  };
  const handledelete = (data, index) => {
    dispatch(deleteUser(index));
    dispatch(addDeleteedUSer(data));
  };
  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          sethandleOpen(!handleOpen)
          setisEdit(false)
        }}
      >
        Add User
      </Button>
      <div
      className="usertable"
      >
        <TableContainer component={Paper}>
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
              {users.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.mobile}</TableCell>
                  <TableCell align="center">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleEdit(row, index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handledelete(row, index)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {handleOpen && (
          <AdduserModal visible={handleOpen} edittodata={edittodata} editIndex={editIndex} isEdit={isEdit} setvisible={sethandleOpen} />
        )}
      </div>
    </>
  );
}
