import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { getAllergensApi, showAllergenApi } from '@/features/menu/allergens/api'
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
export const getAllergens = createAsyncThunk('STAFF/GET_ALLERGENS', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getAllergensApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showAllergen = createAsyncThunk('STAFF/SHOW_ALLERGEN', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showAllergenApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const AllergensSlice = createSlice({
	name: 'Allergens-slice',
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
			.addCase(getAllergens.pending, state => {
				state.loading = true
			})
			.addCase(getAllergens.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getAllergens.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showAllergen.pending, state => {
				state.showLoading = true
			})
			.addCase(showAllergen.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showAllergen.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = AllergensSlice.actions
export const { reset } = AllergensSlice.actions
export const allergensReducer = AllergensSlice.reducer
