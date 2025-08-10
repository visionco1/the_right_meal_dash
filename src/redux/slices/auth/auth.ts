import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { APICore } from '../../../helpers/api/apiCore'
import { AuthActionTypes } from '../../auth/constants'
import {
	signup as signupApi,
	forgotPassword as forgotPasswordApi,
	verifyCode as verifyCodeApi,
	sendVerification,
	passwordVerifyCodeApi,
	resetPasswordApi,
	TReset
} from '../../../helpers/api/auth'

// Define UserData type
interface UserData {
	id: number
	username: string
	password: string
	firstName: string
	lastName: string
	role: string
	token: string
}

interface AuthState {
	user: UserData | null
	loading: boolean
	error: string | null
	userLoggedIn: boolean
	userLoggedOut: boolean
	userLogoutResponse: any
	userSignUp: boolean
	verifiedUser: boolean
	verificationSent: boolean
	passwordReset: boolean
	passwordCodeSent: boolean
	forgotPasswordResponse: any
	passwordVerifyCodeResponse: any
	passwordCodeVerified: boolean
	resetPasswordResponse: null
	passwordResetSuccess: boolean
}
interface UserSignUpData {
	f_name: string
	l_name: string
	phone: string
	email: string
	password: string
	password_confirmation: string
	code: string
	device_token: string
	auth_type: string
	preferred_locale: string
	avatar: File | any
	dial_code: string
	branch_id: string
}
const initialState: AuthState = {
	user: null,
	loading: false,
	error: null,
	userLoggedIn: false,
	userLoggedOut: false,
	userLogoutResponse: null,
	userSignUp: false,
	verifiedUser: false,
	verificationSent: false,
	passwordReset: false,
	passwordCodeSent: false,
	forgotPasswordResponse: null,
	passwordVerifyCodeResponse: null,
	passwordCodeVerified: false,
	resetPasswordResponse: null,
	passwordResetSuccess: false
}

interface UserVerifyCode {
	username: string
	code: string
}
// Thunks for async actions (Login, Signup, Logout, Forgot Password)

export const signupUser = createAsyncThunk(
	AuthActionTypes.SIGNUP_USER,
	async (params: UserSignUpData, { rejectWithValue }) => {
		try {
			const response = await signupApi(params)
			const user = response?.data
			const api = new APICore()
			api.setAuthorization(user?.token)
			api.setLoggedInUser(user)
			return user
		} catch (error: any) {
			return rejectWithValue(error || 'Failed')
		}
	}
)

export const verifyCode = createAsyncThunk(
	AuthActionTypes.VERIFY_CODE,
	async (params: UserVerifyCode, { rejectWithValue }) => {
		try {
			const api = new APICore()
			const loggedInUser = api.getLoggedInUser()
			const response = await verifyCodeApi({ ...params, username: loggedInUser?.data?.email })
			return response.data
		} catch (error: any) {
			return rejectWithValue(error || 'Failed')
		}
	}
)

export const sendVerificationCode = createAsyncThunk(
	AuthActionTypes.SEND_VERIFICATION,
	async (_, { rejectWithValue }) => {
		try {
			const api = new APICore()
			const loggedInUser = api.getLoggedInUser()
			const response = await sendVerification({ username: loggedInUser?.data?.email })
			return response.data
		} catch (error: any) {
			return rejectWithValue(error || 'Failed')
		}
	}
)

// forget password
export const forgotPassword = createAsyncThunk(
	AuthActionTypes.FORGOT_PASSWORD,
	async (username: string, { rejectWithValue }) => {
		try {
			const response = await forgotPasswordApi(username)
			return response.data
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed')
		}
	}
)

export const passwordVerifyCode = createAsyncThunk(
	AuthActionTypes.PASSWORD_VERIFY_CODE,
	async (data: UserVerifyCode, { rejectWithValue }) => {
		try {
			const response = await passwordVerifyCodeApi(data)
			return response.data
		} catch (error: any) {
			return rejectWithValue(error || 'Failed')
		}
	}
)

export const resetPassword = createAsyncThunk(
	AuthActionTypes.RESET,
	async (data: TReset, { rejectWithValue }) => {
		try {
			const api = new APICore()
			const loggedInUser = api.getLoggedInUser()
			const response = await resetPasswordApi(data)
			return response.data
		} catch (error: any) {
			return rejectWithValue(error || 'Failed')
		}
	}
)

// Slice definition
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetAuth: state => {
			state.loading = false
			state.error = null
			state.userSignUp = false
			state.userLoggedIn = false
			state.userLoggedOut = false
			state.userLogoutResponse = null
			state.passwordReset = false
			state.resetPasswordResponse = null
			;(state.passwordCodeSent = false),
				(state.forgotPasswordResponse = null),
				(state.passwordVerifyCodeResponse = null),
				(state.passwordCodeVerified = false),
				(state.resetPasswordResponse = null),
				(state.passwordResetSuccess = false)
		}
	},
	extraReducers: builder => {
		builder
			// Handling signup actions
			.addCase(signupUser.pending, state => {
				state.loading = true
			})
			.addCase(signupUser.fulfilled, state => {
				state.error = null
				state.loading = false
				state.userSignUp = true
			})
			.addCase(signupUser.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.userSignUp = false
				state.loading = false
			})

			// Handling send verification code actions
			.addCase(sendVerificationCode.pending, state => {
				state.loading = true
			})
			.addCase(sendVerificationCode.fulfilled, state => {
				state.error = null
				state.loading = false
				state.verificationSent = true
			})
			.addCase(sendVerificationCode.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.verificationSent = false
				state.loading = false
			})
			// Handling verify code actions
			.addCase(verifyCode.pending, state => {
				state.loading = true
			})
			.addCase(verifyCode.fulfilled, state => {
				state.error = null
				state.loading = false
				state.verifiedUser = true
			})
			.addCase(verifyCode.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.verifiedUser = false
				state.loading = false
			})

			// Handling forgot password actions
			.addCase(forgotPassword.pending, state => {
				state.loading = true
				state.passwordCodeSent = false
			})
			.addCase(forgotPassword.fulfilled, (state, action: PayloadAction<any>) => {
				state.forgotPasswordResponse = action.payload
				state.passwordCodeSent = true
				state.loading = false
			})
			.addCase(forgotPassword.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.passwordCodeSent = false
				state.forgotPasswordResponse = null
				state.loading = false
			})

			// Handling forgot password actions
			.addCase(passwordVerifyCode.pending, state => {
				state.loading = true
				state.passwordCodeVerified = false
			})
			.addCase(passwordVerifyCode.fulfilled, (state, action: PayloadAction<any>) => {
				state.passwordVerifyCodeResponse = action.payload
				state.passwordCodeVerified = true
				state.loading = false
			})
			.addCase(passwordVerifyCode.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.passwordVerifyCodeResponse = null
				state.passwordCodeVerified = false
				state.loading = false
			})

			.addCase(resetPassword.pending, state => {
				state.loading = true
				state.resetPasswordResponse = null
				state.passwordResetSuccess = false
			})
			.addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
				state.resetPasswordResponse = action.payload
				state.passwordResetSuccess = true
				state.loading = false
			})
			.addCase(resetPassword.rejected, (state, action: PayloadAction<any>) => {
				state.error = action.payload
				state.resetPasswordResponse = null
				state.passwordResetSuccess = false
				state.loading = false
			})
	}
})

// Exporting actions and reducer
export const authActions = authSlice.actions
export const { resetAuth } = authSlice.actions
export const authReducer = authSlice.reducer
