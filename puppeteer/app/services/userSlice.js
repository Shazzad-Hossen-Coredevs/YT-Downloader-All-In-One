import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  inputVal:'',
  data: null,
}

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    
    setData: (state, {payload}) => {
        state[payload.target]= payload.value;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setData} = userSlice.actions

export default userSlice.reducer