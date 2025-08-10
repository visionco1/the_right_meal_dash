import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { getSectionMealsApi, showSectionMealApi } from '@/features/menu/section-meals/api'
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
export const getSectionMeals = createAsyncThunk('STAFF/GET_SectionMeal_MEALS', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getSectionMealsApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showSectionMeal = createAsyncThunk('STAFF/SHOW_SectionMeal_MEAL', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showSectionMealApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const SectionMealsSlice = createSlice({
	name: 'section-meals-slice',
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
			.addCase(getSectionMeals.pending, state => {
				state.loading = true
			})
			.addCase(getSectionMeals.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getSectionMeals.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showSectionMeal.pending, state => {
				state.showLoading = true
			})
			.addCase(showSectionMeal.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showSectionMeal.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = SectionMealsSlice.actions
export const { reset } = SectionMealsSlice.actions
export const SectionMealsReducer = SectionMealsSlice.reducer
