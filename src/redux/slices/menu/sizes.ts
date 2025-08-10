import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { getSizesApi, showSizeApi } from '@/features/menu/sizes/api'
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
export const getSizes = createAsyncThunk('STAFF/GET_SIZES', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getSizesApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showSize = createAsyncThunk('STAFF/SHOW_SIZE', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showSizeApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice
const sizesSlice = createSlice({
	name: 'sizes-slice',
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
			.addCase(getSizes.pending, state => {
				state.loading = true
			})
			.addCase(getSizes.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getSizes.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showSize.pending, state => {
				state.showLoading = true
			})
			.addCase(showSize.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showSize.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = sizesSlice.actions
export const { reset } = sizesSlice.actions
export const sizesReducer = sizesSlice.reducer
