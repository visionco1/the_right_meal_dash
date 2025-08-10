import { getWorkDaysApi } from '@/features/menu/menu/api'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

type TState = {
	data: any
	loading: boolean
	error: any
}
// initial state
const initialState: TState = {
	data: null,
	loading: false,
	error: null
}

// get data
export const getWorkDays = createAsyncThunk('STAFF/GET_WORKDAYS', async (_, { rejectWithValue }) => {
	try {
		const response = await getWorkDaysApi()
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})

// Slice definition
const workDaysSlice = createSlice({
	name: 'work-days-slice',
	initialState,
	reducers: {
		reset: state => {
			// state.loading = false
			state.error = null
		}
	},
	extraReducers: builder => {
		builder
			// Handling get
			.addCase(getWorkDays.pending, state => {
				state.loading = true
			})
			.addCase(getWorkDays.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getWorkDays.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
	}
})

// Exporting actions and reducer
export const dataActions = workDaysSlice.actions
export const { reset } = workDaysSlice.actions
export const workDaysReducer = workDaysSlice.reducer
