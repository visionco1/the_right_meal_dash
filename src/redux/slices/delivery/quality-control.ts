import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
// import { TShowResponse } from './type'
import { getQualityControlsApi, showQualityControlApi } from '@/features/delivery/quality-control/api'
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
export const getQualityControls = createAsyncThunk('STAFF/GET_QUALITY_CONTROL', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getQualityControlsApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showQualityControl = createAsyncThunk('STAFF/SHOW_QUALITY_CONTROL', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showQualityControlApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const QualityControlSlice = createSlice({
	name: 'quality-control-slice',
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
			.addCase(getQualityControls.pending, state => {
				state.loading = true
			})
			.addCase(getQualityControls.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getQualityControls.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showQualityControl.pending, state => {
				state.showLoading = true
			})
			.addCase(showQualityControl.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showQualityControl.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = QualityControlSlice.actions
export const { reset } = QualityControlSlice.actions
export const QualityControlReducer = QualityControlSlice.reducer
