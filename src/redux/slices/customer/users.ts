import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
// import { TShowResponse } from './type'
import { getUsersApi, showCustomerHealthApi, showUserApi } from '@/features/customers/customers/api'
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
export const getUsers = createAsyncThunk('STAFF/GET_USERS', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getUsersApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showUser = createAsyncThunk('STAFF/SHOW_USER', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showUserApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})
// show
export const showCustomerHealth = createAsyncThunk('STAFF/SHOW_CUSTOMER_HEALTH', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showCustomerHealthApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const UsersSlice = createSlice({
	name: 'Users-slice',
	initialState,
	reducers: {
		reset: state => {
			state.error = null
			state.showError = null
		}
	},
	extraReducers: builder => {
		builder
			// Handling get
			.addCase(getUsers.pending, state => {
				state.loading = true
			})
			.addCase(getUsers.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getUsers.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showUser.pending, state => {
				state.showLoading = true
			})
			.addCase(showUser.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showUser.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
			// Handling show customer health
			.addCase(showCustomerHealth.pending, state => {
				state.showLoading = true
				state.showError = null
				state.showResponse = null
			})
			.addCase(showCustomerHealth.fulfilled, (state, action: PayloadAction<any>) => {
				state.showLoading = false
				state.showError = null
				state.showResponse = action.payload
			})
			.addCase(showCustomerHealth.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = UsersSlice.actions
export const { reset } = UsersSlice.actions
export const usersReducer = UsersSlice.reducer
