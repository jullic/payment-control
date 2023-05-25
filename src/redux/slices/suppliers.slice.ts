import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ISupplier } from '../../interfaces/supplier.interface';

export const fetchSuppliers = createAsyncThunk<any, undefined>(
	'suppliers/fetchSuppliers',
	async (_, thunkApi) => {
		try {
			const { data } = await axios.get<ISupplier[]>(
				`http://localhost:3300/suppliers`
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return thunkApi.rejectWithValue(
					error.response?.data || 'error'
				);
			}
		}
	}
);

export const createSuppliers = createAsyncThunk<any, ISupplier>(
	'suppliers/createSuppliers',
	async (body, thunkApi) => {
		try {
			const { data } = await axios.post(
				`http://localhost:3300/suppliers`,
				body
			);
			const newSuppliers = await thunkApi.dispatch(fetchSuppliers());

			return newSuppliers;
		} catch (error) {
			if (error instanceof AxiosError) {
				thunkApi.rejectWithValue(error.response?.data || 'error');
			}
		}
	}
);

interface ISuppliersSliceState {
	status: 'loading' | 'idle' | 'error';
	suppliers: ISupplier[];
	supplier: ISupplier | null;
}

const initialState: ISuppliersSliceState = {
	status: 'idle',
	suppliers: [],
	supplier: null,
};

export const suppliersSlice = createSlice({
	name: 'suppliers',
	initialState,
	reducers: {
		getSupplier(
			state,
			action: PayloadAction<{ supplier: ISupplier | null }>
		) {
			state.supplier = action.payload.supplier;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchSuppliers.pending,
				(state, action: PayloadAction<any>) => {
					state.status = 'loading';
				}
			)
			.addCase(
				fetchSuppliers.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.status = 'idle';
					state.suppliers = action.payload;
				}
			)
			.addCase(
				fetchSuppliers.rejected,
				(state, action: PayloadAction<any>) => {
					state.status = 'error';
				}
			);

		builder
			.addCase(
				createSuppliers.pending,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				createSuppliers.fulfilled,
				(state, action: PayloadAction<any>) => {}
			)
			.addCase(
				createSuppliers.rejected,
				(state, action: PayloadAction<any>) => {}
			);
	},
});

export const suppliersReducer = suppliersSlice.reducer;
export const { getSupplier } = suppliersSlice.actions;
