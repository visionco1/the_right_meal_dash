import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TState } from './type'
import { getNotificationsApi, showNotificationApi } from '@/features/marketing/notifications/api'

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
export const getNotifications = createAsyncThunk('NOTIFICATIONS/GET_NOTIFICATIONS', async (params: any, { rejectWithValue }) => {
	try {
		const response = await getNotificationsApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
export const showNotification = createAsyncThunk('NOTIFICATIONS/SHOW_NOTIFICATION', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showNotificationApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})

// Slice definition
const NotificationsSlice = createSlice({
	name: 'Notifications-slice',
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
			.addCase(getNotifications.pending, state => {
				state.loading = true
			})
			.addCase(getNotifications.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getNotifications.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling show
			.addCase(showNotification.pending, state => {
				state.showLoading = true
			})
			.addCase(showNotification.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showNotification.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = NotificationsSlice.actions
export const { reset } = NotificationsSlice.actions
export const NotificationsReducer = NotificationsSlice.reducer
