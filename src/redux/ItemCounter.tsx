import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

export interface CounterState{
  [key: number]: number;
}
const initialState: CounterState = {}
const counterSlice = createSlice({
  name:'contador',
  initialState,
  reducers:{
    aumentar: (state, action: PayloadAction<number>) => {
      const id = action.payload
      state[id] = (state[id] || 0) + 1
    },
    diminuir: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state[id] > 0) {
        state[id] -= 1
      }
    },
  },
})

export const {aumentar, diminuir } = counterSlice.actions;
export default counterSlice.reducer;
