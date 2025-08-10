import { APICore } from './apiCore'

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
	avatar: File
	dial_code: string
	branch_id: string
}
interface UserVerifyCode {
	username: string
	code: string
}

const api = new APICore()
// account
function login(params: { username: string; password: string }) {
	const baseUrl = '/api/admin/login'
	return api.create(`${baseUrl}`, params)
}

function logout() {
	const baseUrl = '/api/admin/logout'
	return api.create(`${baseUrl}`, {})
}

function signup(params: UserSignUpData) {
	const baseUrl = '/api/admin/register'
	return api.createWithFile(`${baseUrl}`, params)
}

function verifyCode(params: UserVerifyCode) {
	const baseUrl = '/api/admin/verification/verify'
	return api.create(`${baseUrl}`, params)
}
function sendVerification(username: { username: string }) {
	const baseUrl = '/api/admin/verification/send'
	return api.create(`${baseUrl}`, username)
}

function forgotPassword(username: string) {
	const baseUrl = '/api/admin/password/reset/send'
	return api.create(`${baseUrl}`, { username: username })
}

function passwordVerifyCodeApi(data: { username: string; code: string | number }) {
	const baseUrl = '/api/admin/password/reset/verify'
	return api.create(`${baseUrl}`, data)
}

export type TReset = {
	token: string
	password: string
	password_confirmation: string
}
function resetPasswordApi(data: TReset) {
	const baseUrl = '/api/admin/password/reset'
	return api.create(`${baseUrl}`, data)
}

export {
	login,
	logout,
	signup,
	forgotPassword,
	verifyCode,
	sendVerification,
	passwordVerifyCodeApi,
	resetPasswordApi
}
