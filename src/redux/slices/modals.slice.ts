import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalsSliceState {
	modal: 'choice' | 'create' | 'none';
}

const initialState: IModalsSliceState = {
	modal: 'none',
};

export const modalsSlice = createSlice({
	name: 'modalsSlice',
	initialState,
	reducers: {
		changeModal(
			state,
			action: PayloadAction<'choice' | 'create' | 'none'>
		) {
			state.modal = action.payload;
		},
	},
});

export const modalsReducer = modalsSlice.reducer;
export const { changeModal } = modalsSlice.actions;
