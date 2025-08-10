import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TCountryParams } from '@/features/settings/type'
import { ReportStatusApi, createReportApi, deleteReportApi, getReportsApi, showReportApi, updateReportApi } from '@/features/reports/api'
import { TState } from './type'

// initial state
const initialState: TState = {
	data: null,
	loading: false,
	error: null,
	created: false,
	createLoading: false,
	createResponse: null,
	createError: null,
	updated: false,
	updateLoading: false,
	updateResponse: null,
	updateError: null,
	showLoading: false,
	showResponse: null,
	showError: null,
	deleteLoading: false,
	deleteResponse: null,
	deleteError: null,
	deleted: false,
	statusLoading: false,
	statusResponse: null,
	statusError: null,
	statusUpdated: false
}

// get data
export const getReports = createAsyncThunk('STAFF/GET_REPORTS', async (params: TCountryParams, { rejectWithValue }) => {
	try {
		const response = await getReportsApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed')
	}
})
// create
export const createReport = createAsyncThunk('STAFF/CREATE_REPORT', async (params: any, { rejectWithValue }) => {
	try {
		const response = await createReportApi(params)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error || 'Failed')
	}
})
// update
export const updateReport = createAsyncThunk('STAFF/UPDATE_REPORT', async ({ id, data }: { id: ID; data: any }, { rejectWithValue }) => {
	try {
		const response = await updateReportApi(id, data)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error || 'Failed')
	}
})
// show
export const showReport = createAsyncThunk('STAFF/SHOW_REPORT', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await showReportApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error.message || 'Failed to get data')
	}
})
// delete
export const deleteReport = createAsyncThunk('STAFF/DELETE_REPORT', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await deleteReportApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error || 'Failed')
	}
})
// block
export const changeReportStatus = createAsyncThunk('STAFF/BLOCK_REPORT', async (id: ID, { rejectWithValue }) => {
	try {
		const response = await ReportStatusApi(id)
		return response?.data
	} catch (error: any) {
		return rejectWithValue(error || 'Failed')
	}
})

// Slice definition
const ReportsSlice = createSlice({
	name: 'Reports-slice',
	initialState,
	reducers: {
		reset: state => {
			// state.loading = false
			state.error = null
			state.showError = null
			state.created = false
			state.createLoading = false
			state.createResponse = null
			state.createError = null
			state.deleteResponse = null
			state.deleteError = null
			state.updateError = null
			state.updateResponse = null
			state.deleted = false
			state.updated = false
			state.statusLoading = false
			state.statusResponse = null
			state.statusError = null
			state.statusUpdated = false
		}
	},
	extraReducers: builder => {
		builder
			// Handling get
			.addCase(getReports.pending, state => {
				state.loading = true
			})
			.addCase(getReports.fulfilled, (state, action: PayloadAction<any>) => {
				state.error = null
				state.loading = false
				state.data = action.payload
			})
			.addCase(getReports.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.loading = false
			})
			// Handling create
			.addCase(createReport.pending, state => {
				state.createLoading = true
			})
			.addCase(createReport.fulfilled, (state, action: PayloadAction<any>) => {
				state.createError = null
				state.createLoading = false
				state.created = true
				state.createResponse = action.payload
			})
			.addCase(createReport.rejected, (state, action: PayloadAction<any>) => {
				state.createError = action.payload
				state.createLoading = false
				state.createResponse = null
				state.created = false
			})
			// Handling show
			.addCase(showReport.pending, state => {
				state.showLoading = true
			})
			.addCase(showReport.fulfilled, (state, action: PayloadAction<any>) => {
				state.showError = null
				state.showLoading = false
				state.showResponse = action.payload
			})
			.addCase(showReport.rejected, (state, action: PayloadAction<any>) => {
				state.showError = action.payload
				state.showLoading = false
				state.showResponse = null
			})
			// Handling delete
			.addCase(deleteReport.pending, state => {
				state.deleteLoading = true
			})
			.addCase(deleteReport.fulfilled, (state, action: PayloadAction<any>) => {
				state.deleteError = null
				state.deleteLoading = false
				state.deleted = true
				state.deleteResponse = action.payload
			})
			.addCase(deleteReport.rejected, (state, action: PayloadAction<any>) => {
				state.deleteError = action.payload
				state.deleteLoading = false
				state.deleteResponse = null
			})
			// Handling update
			.addCase(updateReport.pending, state => {
				state.updateLoading = true
			})
			.addCase(updateReport.fulfilled, (state, action: PayloadAction<any>) => {
				state.updateError = null
				state.updateLoading = false
				state.updated = true
				state.updateResponse = action.payload
			})
			.addCase(updateReport.rejected, (state, action: PayloadAction<any>) => {
				state.updateError = action.payload
				state.updateLoading = false
				state.updateResponse = null
			})
			// Handling block
			.addCase(changeReportStatus.pending, state => {
				state.statusLoading = true
			})
			.addCase(changeReportStatus.fulfilled, (state, action: PayloadAction<any>) => {
				state.statusError = null
				state.statusLoading = false
				state.statusResponse = action.payload
				state.statusUpdated = true
			})
			.addCase(changeReportStatus.rejected, (state, action: PayloadAction<any>) => {
				state.statusError = action.payload
				state.statusLoading = false
				state.statusResponse = null
			})
	}
})

// Exporting actions and reducer
export const dataActions = ReportsSlice.actions
export const { reset } = ReportsSlice.actions
export const ReportsReducer = ReportsSlice.reducer
