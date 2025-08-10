import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { getMenusApi, showMenuApi } from '@/features/menu/menu/api'
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
export const getMenus = createAsyncThunk('STAFF/GET_MENUS', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getMenusApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// show
export const showMenu = createAsyncThunk('STAFF/SHOW_MENU', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showMenuApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const menusSlice = createSlice({
	name: 'menus-slice',
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
			.addCase(getMenus.pending, state => {
				state.loading = true
			})
			.addCase(getMenus.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getMenus.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showMenu.pending, state => {
				state.showLoading = true
			})
			.addCase(showMenu.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showMenu.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = menusSlice.actions
export const { reset } = menusSlice.actions
export const menusReducer = menusSlice.reducer
