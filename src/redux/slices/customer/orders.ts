import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getOrdersApi, showOrderApi } from '@/features/customers/orders/api'
import { TState } from './type'

// initial state
const initialState: TState = {
	data: null,
	loading: false,
	error: null,
	showLoading: false,
	showResponse: null,
	showError: null
}

// get data
export const getOrders = createAsyncThunk('ORDERS/GET_ORDERS', async (params: any, { rejectWithValue }) => {
	try {
		const response = await getOrdersApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showOrder = createAsyncThunk('ORDERS/SHOW_ORDER', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showOrderApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const OrdersSlice = createSlice({
	name: 'Orders-slice',
	initialState,
	reducers: {
		reset: state => {
			// state.loading = false
			state.error = null
			state.showError = null
		}
	},
	extraReducers: builder => {
		builder
			// Handling get
			.addCase(getOrders.pending, state => {
				state.loading = true
			})
			.addCase(getOrders.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getOrders.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showOrder.pending, state => {
				state.showLoading = true
			})
			.addCase(showOrder.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showOrder.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = OrdersSlice.actions
export const { reset } = OrdersSlice.actions
export const OrdersReducer = OrdersSlice.reducer
