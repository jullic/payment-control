import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearchSliceState {
	search: string;
}

const initialState: ISearchSliceState = {
	search: '',
};

export const searchSlice = createSlice({
	name: 'searchSlice',
	initialState,
	reducers: {
		changeSearch(state, action: PayloadAction<string>) {
			state.search = action.payload;
		},
	},
});

export const searchReducer = searchSlice.reducer;
export const { changeSearch } = searchSlice.actions;
