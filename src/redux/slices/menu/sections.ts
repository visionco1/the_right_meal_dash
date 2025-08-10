import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { getSectionsApi, showSectionApi } from '@/features/menu/sections/api'
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
export const getSections = createAsyncThunk('STAFF/GET_SECTIONS', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getSectionsApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})

// show
export const showSection = createAsyncThunk('STAFF/SHOW_SECTION', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showSectionApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const sectionsSlice = createSlice({
	name: 'sections-slice',
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
			.addCase(getSections.pending, state => {
				state.loading = true
			})
			.addCase(getSections.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getSections.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showSection.pending, state => {
				state.showLoading = true
			})
			.addCase(showSection.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showSection.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = sectionsSlice.actions
export const { reset } = sectionsSlice.actions
export const sectionsReducer = sectionsSlice.reducer
