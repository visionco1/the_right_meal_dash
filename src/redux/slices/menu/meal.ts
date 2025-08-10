import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { getMealsApi, showMealApi } from '@/features/menu/meal/api'
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
export const getMeals = createAsyncThunk('STAFF/GET_MEALS', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getMealsApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showMeal = createAsyncThunk('STAFF/SHOW_MEAL', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showMealApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const mealSlice = createSlice({
	name: 'meal-slice',
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
			.addCase(getMeals.pending, state => {
				state.loading = true
			})
			.addCase(getMeals.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getMeals.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showMeal.pending, state => {
				state.showLoading = true
			})
			.addCase(showMeal.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showMeal.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = mealSlice.actions
export const { reset } = mealSlice.actions
export const mealReducer = mealSlice.reducer
