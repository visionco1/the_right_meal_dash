import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { getMealCategoriesApi, showMealCategoryApi } from '@/features/menu/meal-categories/api'
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
export const getMealCategories = createAsyncThunk('STAFF/GET_MEAL_CATEGORIES', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getMealCategoriesApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})

// show
export const showMealCategory = createAsyncThunk('STAFF/SHOW_MEAL_CATEGORY', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showMealCategoryApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const mealCategoriesSlice = createSlice({
	name: 'meal-Categories-slice',
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
			.addCase(getMealCategories.pending, state => {
				state.loading = true
			})
			.addCase(getMealCategories.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getMealCategories.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showMealCategory.pending, state => {
				state.showLoading = true
			})
			.addCase(showMealCategory.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showMealCategory.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = mealCategoriesSlice.actions
export const { reset } = mealCategoriesSlice.actions
export const mealCategoriesReducer = mealCategoriesSlice.reducer
