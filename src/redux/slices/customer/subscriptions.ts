import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { getSubscriptionsApi, showSubscriptionApi } from '@/features/customers/subscriptions/api'
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
export const getSubscriptions = createAsyncThunk('CUSTOMERS/GET_SUBSCRIPTIONS', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getSubscriptionsApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})

// show
export const showSubscription = createAsyncThunk('CUSTOMERS/SHOW_SUBSCRIPTION', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showSubscriptionApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const SubscriptionsSlice = createSlice({
	name: 'subscriptions-slice',
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
			.addCase(getSubscriptions.pending, state => {
				state.loading = true
			})
			.addCase(getSubscriptions.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getSubscriptions.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showSubscription.pending, state => {
				state.showLoading = true
			})
			.addCase(showSubscription.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showSubscription.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = SubscriptionsSlice.actions
export const { reset } = SubscriptionsSlice.actions
export const SubscriptionsReducer = SubscriptionsSlice.reducer
