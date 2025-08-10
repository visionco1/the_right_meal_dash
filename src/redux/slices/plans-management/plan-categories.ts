import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { getPlanCategoriesApi, showPlanCategoryApi } from '@/features/plans-management/plan-categories/api'
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
export const getPlanCategories = createAsyncThunk('STAFF/GET_PLAN_CATEGORIES', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getPlanCategoriesApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showPlanCategory = createAsyncThunk('STAFF/SHOW_PLAN_CATEGORY', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showPlanCategoryApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const planCategoriesSlice = createSlice({
	name: 'plan-categories-slice',
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
			.addCase(getPlanCategories.pending, state => {
				state.loading = true
			})
			.addCase(getPlanCategories.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getPlanCategories.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showPlanCategory.pending, state => {
				state.showLoading = true
			})
			.addCase(showPlanCategory.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showPlanCategory.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = planCategoriesSlice.actions
export const { reset } = planCategoriesSlice.actions
export const planCategoriesReducer = planCategoriesSlice.reducer
