import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TState } from './type'
import { getWhyUsApi, showWhyUsApi } from '@/features/settings/why-us/api'

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
export const getWhyUs = createAsyncThunk('WHY_US/GET_WHY_USS', async (params: any, { rejectWithValue }) => {
	try {
		const response = await getWhyUsApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showWhyUs = createAsyncThunk('WHY_US/SHOW_WHY_US', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showWhyUsApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const WhyUsSlice = createSlice({
	name: 'WhyUs-slice',
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
			.addCase(getWhyUs.pending, state => {
				state.loading = true
			})
			.addCase(getWhyUs.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getWhyUs.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showWhyUs.pending, state => {
				state.showLoading = true
			})
			.addCase(showWhyUs.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showWhyUs.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = WhyUsSlice.actions
export const { reset } = WhyUsSlice.actions
export const WhyUsReducer = WhyUsSlice.reducer
