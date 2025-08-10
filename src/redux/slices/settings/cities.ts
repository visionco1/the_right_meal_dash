import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { TShowResponse } from './type'
import { getCitiesApi, showCityApi } from '@/features/settings/cities/api'

// Define UserData type

interface TState {
	data: any
	loading: boolean
	error: string | null
	showLoading: boolean
	showResponse: TShowResponse | null
	showError: string | null
}

const initialState: TState = {
	data: null,
	loading: false,
	error: null,
	showLoading: false,
	showResponse: null,
	showError: null
}

// get
export const getCities = createAsyncThunk('SETTINGS/GET_CITIES', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getCitiesApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showCity = createAsyncThunk('SETTINGS/SHOW_CITY', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showCityApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const citiesSlice = createSlice({
	name: 'cities-slice',
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
			.addCase(getCities.pending, state => {
				state.loading = true
			})
			.addCase(getCities.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getCities.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showCity.pending, state => {
				state.showLoading = true
			})
			.addCase(showCity.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showCity.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const countriesActions = citiesSlice.actions
export const { reset } = citiesSlice.actions
export const citiesReducer = citiesSlice.reducer
