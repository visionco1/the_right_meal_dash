import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TState } from './type'
import { getCouponsApi, showCouponApi } from '@/features/marketing/coupons/api'

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
export const getCoupons = createAsyncThunk('COUPONS/GET_COUPONS', async (params: any, { rejectWithValue }) => {
	try {
		const response = await getCouponsApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showCoupon = createAsyncThunk('COUPONS/SHOW_Coupon', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showCouponApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const CouponsSlice = createSlice({
	name: 'Coupons-slice',
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
			.addCase(getCoupons.pending, state => {
				state.loading = true
			})
			.addCase(getCoupons.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getCoupons.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showCoupon.pending, state => {
				state.showLoading = true
			})
			.addCase(showCoupon.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showCoupon.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = CouponsSlice.actions
export const { reset } = CouponsSlice.actions
export const CouponsReducer = CouponsSlice.reducer
