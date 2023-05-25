import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export const fetch$FILENAME = createAsyncThunk<any, any>(
	'FILENAME/fetch$FILENAME',
	async (_, thunkApi) => {
		try {
			const { data } = await axios.get(
				`https://localhost:3300/__FILENAME`
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

export const create$FILENAME = createAsyncThunk<any, any>(
	'FILENAME/create$FILENAME',
	async (body, thunkApi) => {
		try {
			const { data } = await axios.post(
				`https://localhost:3300/__FILENAME`,
				body
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

export const fetch$FILENAMEById = createAsyncThunk<any, any>(
	'FILENAME/fetch$FILENAMEById',
	async (id, thunkApi) => {
		try {
			const { data } = await axios.get(
				`https://localhost:3300/__FILENAME/${id}`
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

export const delete$FILENAMEById = createAsyncThunk<any, any>(
	'FILENAME/delete$FILENAMEById',
	async (id, thunkApi) => {
		try {
			const { data } = await axios.delete(
				`https://localhost:3300/__FILENAME/${id}`
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

export const update$FILENAMEById = createAsyncThunk<any, any>(
	'FILENAME/update$FILENAMEById',
	async (body, thunkApi) => {
		try {
			const { data } = await axios.patch(
				`https://localhost:3300/__FILENAME/${body.id}`
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

interface I$FILENAMESliceState {
	status: 'loading' | 'idle' | 'error';
}

const initialState: I$FILENAMESliceState = {
	status: 'idle',
};

export const FILENAMESlice = createSlice({
	name: 'FILENAME',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetch$FILENAME.pending,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				fetch$FILENAME.fulfilled,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				fetch$FILENAME.rejected,
				(state, action: PayloadAction<any>) => {}
			);

		builder
			.addCase(
				create$FILENAME.pending,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				create$FILENAME.fulfilled,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				create$FILENAME.rejected,
				(state, action: PayloadAction<any>) => {}
			);

		builder
			.addCase(
				fetch$FILENAMEById.pending,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				fetch$FILENAMEById.fulfilled,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				fetch$FILENAMEById.rejected,
				(state, action: PayloadAction<any>) => {}
			);

		builder
			.addCase(
				delete$FILENAMEById.pending,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				delete$FILENAMEById.fulfilled,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				delete$FILENAMEById.rejected,
				(state, action: PayloadAction<any>) => {}
			);

		builder
			.addCase(
				update$FILENAMEById.pending,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				update$FILENAMEById.fulfilled,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				update$FILENAMEById.rejected,
				(state, action: PayloadAction<any>) => {}
			);
	},
});

export const FILENAMEReducer = FILENAMESlice.reducer;
export const {} = FILENAMESlice.actions;
