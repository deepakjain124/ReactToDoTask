import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUSer } from "../../redux/user/UserSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AdduserModal({ visible, setvisible,isEdit,edittodata,editIndex }) {
  const handleClose = () => setvisible(false);
  const [userDetails, setUserDetails] = React.useState({
    name: "",
    email: "",
    mobile: "",
  });
  const users = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const checkemailvaidation = () => {
    if (users?.filter((i) => i.email === userDetails.email).length) {
      return true;
    }else{
        return false
    }
  };
  function hasNonBlankProperties(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== '') {
        return true;
      }
    }
   alert("please fill all fields")
  }

  const handleAdd = () => {
    if (checkemailvaidation()) {
      alert("this email is already in use");
    } else if (hasNonBlankProperties(userDetails)) {
      dispatch(addUser(userDetails));
    }
    setvisible(false);
  };

  const handleEdit = () => {
    if (checkemailvaidation()) {
      alert("this email is already in use");
    } else if(hasNonBlankProperties(userDetails)) {
      dispatch(editUSer({userDetails,editIndex}));
    }
    setvisible(false);
  };
  React.useEffect(() => {
    if (isEdit) {
      setUserDetails(edittodata);
    }
  }, []);
  return (
    <div className="addModal">
      <Modal
        open={visible}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" className="label" >
            Name
          </Typography>
          <TextField
            name="name"
            style={{ width: "100%", margin: "8px" }}
            type="text"
            label="name"
            value={userDetails.name}
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <Typography id="modal-modal-title" className="label" >
            Email
          </Typography>
          <TextField
            name="email"
            style={{ width: "100%", margin: "8px" }}
            type="email"
            label="email"
            value={userDetails.email}
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <Typography id="modal-modal-title"className="label">
            Mobile
          </Typography>
          <TextField
            name="mobile"
            required={true}
            style={{ width: "100%", margin: "8px" }}
            type="number"
            value={userDetails.mobile}
            label="mobile"
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <Button variant="contained" onClick={isEdit ? handleEdit : handleAdd}>
            {isEdit ? "Edit User" : "Add User"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
