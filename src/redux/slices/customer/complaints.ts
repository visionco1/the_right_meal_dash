import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getComplaintsApi, showComplaintApi } from '@/features/customers/complaints/api'
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
export const getComplaints = createAsyncThunk('COMPLAINTS/GET_COMPLAINTS', async (params: any, { rejectWithValue }) => {
	try {
		const response = await getComplaintsApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showComplaint = createAsyncThunk('COMPLAINTS/SHOW_COMPLAINT', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showComplaintApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const ComplaintsSlice = createSlice({
	name: 'Complaints-slice',
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
			.addCase(getComplaints.pending, state => {
				state.loading = true
			})
			.addCase(getComplaints.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getComplaints.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showComplaint.pending, state => {
				state.showLoading = true
			})
			.addCase(showComplaint.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showComplaint.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = ComplaintsSlice.actions
export const { reset } = ComplaintsSlice.actions
export const ComplaintsReducer = ComplaintsSlice.reducer
