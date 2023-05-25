import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface I$FILENAMESliceState {}

const initialState: I$FILENAMESliceState = {};

export const FILENAMESlice = createSlice({
	name: 'FILENAMESlice',
	initialState,
	reducers: {},
});

export const FILENAMEReducer = FILENAMESlice.reducer;
export const {} = FILENAMESlice.actions;
