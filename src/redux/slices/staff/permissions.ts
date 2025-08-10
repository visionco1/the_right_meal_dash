import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getPermissionsApi } from '@/features/staff/permissions/api'

// initial state
const initialState: { data: any; loading: boolean; error: any } = {
	data: null,
	loading: false,
	error: null
}

// get data
export const getPermissions = createAsyncThunk('STAFF/GET_PERMISSIONS', async (_, { rejectWithValue }) => {
	try {
		const response = await getPermissionsApi()
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})

// Slice definition
const permissionsSlice = createSlice({
	name: 'Permissions-slice',
	initialState,
	reducers: {
		reset: state => {
			state.loading = false
			state.error = null
		}
	},
	extraReducers: builder => {
		builder
			// Handling get
			.addCase(getPermissions.pending, state => {
				state.loading = true
			})
			.addCase(getPermissions.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getPermissions.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
	}
})

// Exporting actions and reducer
export const dataActions = permissionsSlice.actions
export const { reset } = permissionsSlice.actions
export const permissionsReducer = permissionsSlice.reducer
