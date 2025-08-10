import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { getSubscriptionPlansApi, showSubscriptionPlanApi } from '@/features/plans-management/plans/api'
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
export const getSubscriptionPlans = createAsyncThunk('STAFF/GET_PLANS', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getSubscriptionPlansApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showSubscriptionPlan = createAsyncThunk('STAFF/SHOW_SUBSCRIPTION_PLAN', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showSubscriptionPlanApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const SubscriptionPlansSlice = createSlice({
	name: 'subscription-plans-slice',
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
			.addCase(getSubscriptionPlans.pending, state => {
				state.loading = true
			})
			.addCase(getSubscriptionPlans.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getSubscriptionPlans.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showSubscriptionPlan.pending, state => {
				state.showLoading = true
			})
			.addCase(showSubscriptionPlan.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showSubscriptionPlan.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = SubscriptionPlansSlice.actions
export const { reset } = SubscriptionPlansSlice.actions
export const subscriptionPlansReducer = SubscriptionPlansSlice.reducer
