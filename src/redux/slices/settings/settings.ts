import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getSettingsApi, updateSettingsApi } from '@/features/settings/system-settings/api'
import { TCompanyData } from '@/pages/settings/types'
import { TSystemSettings } from './type'

// Define UserData type

interface settingsState {
	data: TSystemSettings | null
	loading: boolean
	updateLoading: boolean
	error: string | null
	updateError: string | null
	updated: boolean
	addressInfo: any
}

const initialState: settingsState = {
	data: null,
	loading: false,
	updateError: null,
	updateLoading: false,
	error: null,
	updated: false,
	addressInfo: null
}

// Thunks for async actions (getSettings, updateSettings)

export const getSettings = createAsyncThunk('SETTINGS/ALL', async (_, { rejectWithValue }) => {
	try {
		const response = await getSettingsApi()
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get settings')
	}
})
// update settings
export const updateSettings = createAsyncThunk('SETTINGS/UPDATE', async (params: TCompanyData, { rejectWithValue }) => {
	try {
		const response = await updateSettingsApi(params)
		return response.data
	} catch (error: any) {
		return rejectWithValue(error || 'Failed to update settings')
	}
})

// Slice definition
const settingsSlice = createSlice({
	name: 'settings-slice',
	initialState,
	reducers: {
		reset: state => {
			// state.loading = false
			state.error = null
			state.updateError = null
			state.updated = false
		},
		setAddressInfo: (state, value) => {
			state.addressInfo = value?.payload
		}
	},
	extraReducers: builder => {
		builder
			// Handling settings actions
			.addCase(getSettings.pending, state => {
				state.loading = true
			})
			.addCase(getSettings.fulfilled, (state, action: PayloadAction<TSystemSettings>) => {
				state.data = action.payload
				state.loading = false
				state.error = null
			})
			.addCase(getSettings.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})

			// Handling update settings
			.addCase(updateSettings.pending, state => {
				state.updateLoading = true
				state.updated = false
				state.updateError = null
			})
			.addCase(updateSettings.fulfilled, (state, action: PayloadAction<TSystemSettings>) => {
				state.updateError = null
				state.updateLoading = false
				state.data = action.payload
				state.updated = true
			})
			.addCase(updateSettings.rejected, (state, action: PayloadAction<any>) => {
				state.updateError = action.payload
				state.updated = false
				state.updateLoading = false
			})
	}
})

// Exporting actions and reducer
export const settingsActions = settingsSlice.actions
export const { reset, setAddressInfo } = settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
