import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { TShowResponse } from './type'
import { getCountriesApi, showCountryApi } from '@/features/settings/countries/api'

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
export const getCountries = createAsyncThunk('settings/GET_COUNTRIES', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getCountriesApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// show
export const showCountry = createAsyncThunk('settings/SHOW_COUNTRY', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showCountryApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const countriesSlice = createSlice({
	name: 'countries-slice',
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
			// Handling get countries
			.addCase(getCountries.pending, state => {
				state.loading = true
			})
			.addCase(getCountries.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getCountries.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show countries
			.addCase(showCountry.pending, state => {
				state.showLoading = true
			})
			.addCase(showCountry.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showCountry.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const countriesActions = countriesSlice.actions
export const { reset } = countriesSlice.actions
export const countriesReducer = countriesSlice.reducer
