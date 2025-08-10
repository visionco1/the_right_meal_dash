import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { getNutritionFactsApi, showNutritionFactApi } from '@/features/menu/nutrition-facts/api'
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
export const getNutritionFacts = createAsyncThunk('STAFF/GET_NUTRITION_FACTS', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getNutritionFactsApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showNutritionFact = createAsyncThunk('STAFF/SHOW_NUTRITION_FACT', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showNutritionFactApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const NutritionFactsSlice = createSlice({
	name: 'nutrition-facts-slice',
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
			.addCase(getNutritionFacts.pending, state => {
				state.loading = true
			})
			.addCase(getNutritionFacts.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getNutritionFacts.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showNutritionFact.pending, state => {
				state.showLoading = true
			})
			.addCase(showNutritionFact.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showNutritionFact.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = NutritionFactsSlice.actions
export const { reset } = NutritionFactsSlice.actions
export const NutritionFactsReducer = NutritionFactsSlice.reducer
