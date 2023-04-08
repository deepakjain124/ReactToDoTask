import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: [],
  EditedIndex:"",
  deletedUsers:[]
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state,action) => {
      state.user =[...state.user,action.payload]
    },
    editUSer:(state,action)=>{
        let data=[...state.user]
        data[action.payload.editIndex]=action.payload.userDetails
        state.user=data
    },
    deleteUser:(state,action)=>{
        let newdata=[...state.user]
        newdata.splice(action.payload,1)
        state.user=newdata
    },
    addDeleteedUSer:(state,action)=>{
        state.deletedUsers=[...state.deletedUsers,action.payload]
    },
    deleteRestored:(state,action)=>{
        let newdata=[...state.deletedUsers]
        newdata.splice(action.payload,1)
        state.deletedUsers=newdata
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUser,editUSer,addDeleteedUSer,deleteRestored,deleteUser } = userSlice.actions

export default userSlice.reducer