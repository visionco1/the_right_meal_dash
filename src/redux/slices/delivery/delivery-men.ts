import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
// import { TShowResponse } from './type'
import { getDeliveriesApi, showDeliveryApi } from '@/features/delivery/delivery-men/api'
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
export const getDeliveries = createAsyncThunk('STAFF/GET_DELIVERY_MEN', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getDeliveriesApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showDelivery = createAsyncThunk('STAFF/SHOW_DELIVERY_MEN', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showDeliveryApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const DeliveryMenSlice = createSlice({
	name: 'delivery-men-slice',
	initialState,
	reducers: {
		reset: state => {
			state.loading = false
			state.error = null
			state.showError = null
		}
	},
	extraReducers: builder => {
		builder
			// Handling get
			.addCase(getDeliveries.pending, state => {
				state.loading = true
			})
			.addCase(getDeliveries.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getDeliveries.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showDelivery.pending, state => {
				state.showLoading = true
			})
			.addCase(showDelivery.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showDelivery.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = DeliveryMenSlice.actions
export const { reset } = DeliveryMenSlice.actions
export const deliveryMenReducer = DeliveryMenSlice.reducer
