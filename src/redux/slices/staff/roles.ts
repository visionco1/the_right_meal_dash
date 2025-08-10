import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
// import { TShowResponse } from './type'
import { getRolesApi, showRoleApi } from '@/features/staff/roles/api'
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
export const getRoles = createAsyncThunk('STAFF/GET_ROLEs', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getRolesApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showRole = createAsyncThunk('STAFF/SHOW_ROLE', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showRoleApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const RolesSlice = createSlice({
	name: 'roles-slice',
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
			.addCase(getRoles.pending, state => {
				state.loading = true
			})
			.addCase(getRoles.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getRoles.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showRole.pending, state => {
				state.showLoading = true
			})
			.addCase(showRole.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showRole.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = RolesSlice.actions
export const { reset } = RolesSlice.actions
export const rolesReducer = RolesSlice.reducer
