import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TState } from './type'
import { getBannersApi, showBannerApi } from '@/features/marketing/banners/api'

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
export const getBanners = createAsyncThunk('BANNERS/GET_BANNERS', async (params: any, { rejectWithValue }) => {
	try {
		const response = await getBannersApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showBanner = createAsyncThunk('BANNERS/SHOW_BANNER', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showBannerApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const BannersSlice = createSlice({
	name: 'Banners-slice',
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
			.addCase(getBanners.pending, state => {
				state.loading = true
			})
			.addCase(getBanners.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getBanners.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showBanner.pending, state => {
				state.showLoading = true
			})
			.addCase(showBanner.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showBanner.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = BannersSlice.actions
export const { reset } = BannersSlice.actions
export const BannersReducer = BannersSlice.reducer
