import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { TShowResponse } from './type'
import { getBranchesApi, showBranchApi } from '@/features/settings/branches/api'

// Define UserData type

interface TState {
	data: any
	loading: boolean
	error: string | null
	showLoading: boolean
	showResponse: TShowResponse | null
	showError: string | null
}

const initialState: TState = {
	data: null,
	loading: false,
	error: null,
	showLoading: false,
	showResponse: null,
	showError: null
}
// get data
export const getBranches = createAsyncThunk('SETTINGS/GET_BRANCHES', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getBranchesApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show data
export const showBranch = createAsyncThunk('SETTINGS/SHOW_BRANCH', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showBranchApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const branchesSlice = createSlice({
	name: 'branches-slice',
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
			.addCase(getBranches.pending, state => {
				state.loading = true
			})
			.addCase(getBranches.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getBranches.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showBranch.pending, state => {
				state.showLoading = true
			})
			.addCase(showBranch.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showBranch.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = branchesSlice.actions
export const { reset } = branchesSlice.actions
export const branchesReducer = branchesSlice.reducer
