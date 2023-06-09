import { createSlice } from '@reduxjs/toolkit';

const registrationSlice = createSlice({
  name: 'registration',
  initialState: [],
  reducers: {
    addRegistration: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;
