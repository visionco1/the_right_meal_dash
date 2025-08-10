import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
// import { TShowResponse } from './type'
import { getAdminsApi, showAdminApi } from '@/features/staff/staff/api'
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
export const getAdmins = createAsyncThunk('STAFF/GET_ADMINS', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getAdminsApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})

// show
export const showAdmin = createAsyncThunk('STAFF/SHOW_ADMIN', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showAdminApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const adminsSlice = createSlice({
	name: 'admins-slice',
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
			.addCase(getAdmins.pending, state => {
				state.loading = true
			})
			.addCase(getAdmins.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getAdmins.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showAdmin.pending, state => {
				state.showLoading = true
			})
			.addCase(showAdmin.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showAdmin.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = adminsSlice.actions
export const { reset } = adminsSlice.actions
export const adminsReducer = adminsSlice.reducer
