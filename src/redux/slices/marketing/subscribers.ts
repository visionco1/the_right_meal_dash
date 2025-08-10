import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TState } from './type'
import { getSubscribersApi } from '@/features/marketing/subscribers/api'

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
export const getSubscribers = createAsyncThunk('SUBSCRIBERS/GET_SUBSCRIBERS', async (params: any, { rejectWithValue }) => {
	try {
		const response = await getSubscribersApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})

// Slice definition
const SubscribersSlice = createSlice({
	name: 'Subscribers-slice',
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
			.addCase(getSubscribers.pending, state => {
				state.loading = true
			})
			.addCase(getSubscribers.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getSubscribers.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
	}
})

// Exporting actions and reducer
export const dataActions = SubscribersSlice.actions
export const { reset } = SubscribersSlice.actions
export const SubscribersReducer = SubscribersSlice.reducer
