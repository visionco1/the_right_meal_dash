import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TState } from './type'
import { getContactUsApi, showContactUsApi } from '@/features/marketing/contact-us/api'

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
export const getContactUs = createAsyncThunk('CONTACT_US/GET_CONTACT_US', async (params: any, { rejectWithValue }) => {
	try {
		const response = await getContactUsApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showContactUs = createAsyncThunk('CONTACT_US/SHOW_CONTACT_US', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showContactUsApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const ContactUsSlice = createSlice({
	name: 'ContactUs-slice',
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
			.addCase(getContactUs.pending, state => {
				state.loading = true
			})
			.addCase(getContactUs.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getContactUs.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showContactUs.pending, state => {
				state.showLoading = true
			})
			.addCase(showContactUs.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showContactUs.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = ContactUsSlice.actions
export const { reset } = ContactUsSlice.actions
export const ContactUsReducer = ContactUsSlice.reducer
