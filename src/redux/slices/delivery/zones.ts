import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { getZonesApi, showZoneApi } from '@/features/delivery/zones/api'
import { TZoneState } from './type'
import { TZoneResponse } from '@/features/delivery/zones/type'

// initial state
const initialState: TZoneState = {
	data: null,
	loading: false,
	error: null,
	showLoading: false,
	showResponse: null,
	showError: null,
	selectedPlace: [],
	mapCenter: [26.8206, 30.8025],
	rectangleCoords: [0, 0]
}

// get data
export const getZones = createAsyncThunk('STAFF/GET_ZONES', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getZonesApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showZone = createAsyncThunk('STAFF/SHOW_ZONE', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showZoneApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const zonesSlice = createSlice({
	name: 'zones-slice',
	initialState,
	reducers: {
		reset: state => {
			state.loading = false
			state.error = null
			state.showError = null
		},
		setSelectedPlace: (state, value) => {
			state.selectedPlace = value?.payload
		},
		setMapCenter: (state, value) => {
			state.mapCenter = value?.payload
		},
		setRectangleCoords: (state, value) => {
			state.rectangleCoords = value?.payload
		}
	},
	extraReducers: builder => {
		builder
			// Handling get
			.addCase(getZones.pending, state => {
				state.loading = true
			})
			.addCase(getZones.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getZones.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showZone.pending, state => {
				state.showLoading = true
			})
			.addCase(showZone.fulfilled, (state, action: PayloadAction<TZoneResponse>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showZone.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = zonesSlice.actions
export const { reset, setMapCenter, setSelectedPlace, setRectangleCoords } = zonesSlice.actions
export const zonesReducer = zonesSlice.reducer
