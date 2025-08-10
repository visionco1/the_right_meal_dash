import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
// import { TShowResponse } from './type'
import { getOutletsApi, showOutletApi } from '@/features/delivery/outlets/api'
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
export const getOutlets = createAsyncThunk('STAFF/GET_OUTLETS', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getOutletsApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showOutlet = createAsyncThunk('STAFF/SHOW_OUTLET', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showOutletApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const OutletSlice = createSlice({
	name: 'outlet-slice',
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
			.addCase(getOutlets.pending, state => {
				state.loading = true
			})
			.addCase(getOutlets.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getOutlets.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showOutlet.pending, state => {
				state.showLoading = true
			})
			.addCase(showOutlet.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showOutlet.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = OutletSlice.actions
export const { reset } = OutletSlice.actions
export const OutletReducer = OutletSlice.reducer
