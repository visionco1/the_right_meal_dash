import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { getShiftsApi, showShiftApi } from '@/features/delivery/delivery-periods/api'
import { TZoneState } from './type'

// initial state
const initialState: TZoneState = {
	data: null,
	loading: false,
	error: null,
	showLoading: false,
	showResponse: null,
	showError: null
}

// get data
export const getShifts = createAsyncThunk('STAFF/GET_SHIFTS', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getShiftsApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})

// show
export const showShift = createAsyncThunk('STAFF/SHOW_SHIFT', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showShiftApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const shiftsSlice = createSlice({
	name: 'shifts-slice',
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
			.addCase(getShifts.pending, state => {
				state.loading = true
			})
			.addCase(getShifts.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getShifts.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showShift.pending, state => {
				state.showLoading = true
			})
			.addCase(showShift.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showShift.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = shiftsSlice.actions
export const { reset } = shiftsSlice.actions
export const shiftsReducer = shiftsSlice.reducer
