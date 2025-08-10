import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { TShowResponse } from './type'
import { getStatesApi, showStateApi } from '@/features/settings/states/api'

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
// get countries
export const getStates = createAsyncThunk('SETTINGS/GET_STATES', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getStatesApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show countries
export const showState = createAsyncThunk('SETTINGS/SHOW_STATE', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showStateApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const statesSlice = createSlice({
	name: 'states-slice',
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
			.addCase(getStates.pending, state => {
				state.loading = true
			})
			.addCase(getStates.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getStates.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showState.pending, state => {
				state.showLoading = true
			})
			.addCase(showState.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showState.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const countriesActions = statesSlice.actions
export const { reset } = statesSlice.actions
export const statesReducer = statesSlice.reducer
