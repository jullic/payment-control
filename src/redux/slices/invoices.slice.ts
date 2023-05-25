import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IInvoice } from '../../interfaces/invoice.interface';

export const fetchInvoices = createAsyncThunk<IInvoice[], undefined>(
	'invoices/fetchInvoices',
	async (_, thunkApi) => {
		try {
			const { data } = await axios.get(`http://localhost:3300/invoices`);
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

export const createInvoices = createAsyncThunk<any, IInvoice>(
	'invoices/createInvoices',
	async (body, thunkApi) => {
		try {
			const { data } = await axios.post(
				`http://localhost:3300/invoices`,
				{ ...body, status: 'invoice' }
			);
			await thunkApi.dispatch(fetchPaid());
			await thunkApi.dispatch(fetchInvoices());
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

export const deleteInvoices = createAsyncThunk<any, string>(
	'invoices/deleteInvoices',
	async (id, thunkApi) => {
		try {
			const { data } = await axios.delete(
				`http://localhost:3300/invoices/${id}`
			);
			await thunkApi.dispatch(fetchPaid());
			await thunkApi.dispatch(fetchInvoices());
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

export const fetchPaid = createAsyncThunk<IInvoice[], undefined>(
	'invoices/fetchPaid',
	async (_, thunkApi) => {
		try {
			const { data } = await axios.get(`http://localhost:3300/paid`);
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

export const createPaid = createAsyncThunk<any, IInvoice>(
	'invoices/createInvoices',
	async (body, thunkApi) => {
		try {
			const { data } = await axios.post(`http://localhost:3300/paid`, {
				...body,
				status: 'paid',
			});
			await thunkApi.dispatch(fetchPaid());
			await thunkApi.dispatch(fetchInvoices());
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

export const deletePaid = createAsyncThunk<any, string>(
	'invoices/deleteInvoices',
	async (id, thunkApi) => {
		try {
			const { data } = await axios.delete(
				`http://localhost:3300/paid/${id}`
			);
			await thunkApi.dispatch(fetchPaid());
			await thunkApi.dispatch(fetchInvoices());
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

export const changeInvoiceType = createAsyncThunk<any, IInvoice>(
	'invoices/deleteInvoices',
	async (invoice, thunkApi) => {
		try {
			if (invoice.status === 'invoice') {
				await axios.delete(
					`http://localhost:3300/invoices/${invoice.id}`
				);
				await axios.post(`http://localhost:3300/paid`, {
					...invoice,
					status: 'paid',
					id: Math.floor(Math.random() * 10000000),
				});
			} else {
				await axios.delete(`http://localhost:3300/paid/${invoice.id}`);
				await axios.post(`http://localhost:3300/invoices`, {
					...invoice,
					status: 'invoice',
					id: Math.floor(Math.random() * 10000000),
				});
			}

			await thunkApi.dispatch(fetchPaid());
			await thunkApi.dispatch(fetchInvoices());
		} catch (error) {
			if (error instanceof AxiosError) {
				return thunkApi.rejectWithValue(
					error.response?.data || 'error'
				);
			}
		}
	}
);

interface IInvoicesSliceState {
	status: 'loading' | 'idle' | 'error';
	invoices: IInvoice[];
	paid: IInvoice[];
	type: 'all' | 'paid' | 'invoices';
}

const initialState: IInvoicesSliceState = {
	status: 'idle',
	invoices: [],
	paid: [],
	type: 'invoices',
};

export const invoicesSlice = createSlice({
	name: 'invoices',
	initialState,
	reducers: {
		changeType(state, action: PayloadAction<'all' | 'paid' | 'invoices'>) {
			state.type = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchInvoices.pending,
				(state, action: PayloadAction<any>) => {
					state.status = 'loading';
				}
			)
			.addCase(
				fetchInvoices.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.status = 'idle';
					state.invoices = action.payload;
				}
			)
			.addCase(
				fetchInvoices.rejected,
				(state, action: PayloadAction<any>) => {
					state.status = 'error';
				}
			);

		builder
			.addCase(fetchPaid.pending, (state, action: PayloadAction<any>) => {
				state.status = 'loading';
			})
			.addCase(
				fetchPaid.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.status = 'idle';
					state.paid = action.payload;
				}
			)
			.addCase(
				fetchPaid.rejected,
				(state, action: PayloadAction<any>) => {
					state.status = 'error';
				}
			);
	},
});

export const invoicesReducer = invoicesSlice.reducer;
export const invoicesActions = invoicesSlice.actions;
