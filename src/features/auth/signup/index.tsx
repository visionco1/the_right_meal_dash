import { FormInput } from '@/components'
import { Button } from '@/components/ui/button'
import CustomSelect from '@/components/ui/custom-select'
import ProfileImageUpload from '@/components/ui/profile-image-upload'
import { useGetBranches } from '@/features/settings/branches/hooks'
import { setSelect } from '@/helpers/helpers'
import { useTranslation } from 'react-i18next'
import { useSignup } from './hooks'
import AuthContainer from '../AuthContainer'
import AuthLayout from '../AuthLayout'
import { Navigate } from 'react-router-dom'
import BottomLink from '../bottom-link'

const Signup = () => {
	const { t } = useTranslation()
	const { loading, handleChange, handleSubmit, data, verificationSent } = useSignup()
	const { data: branches } = useGetBranches({ is_paginated: 0 })
	return (
		<>
			{verificationSent ? <Navigate to={'/auth/confirm-mail'}></Navigate> : null}
			<AuthContainer>
				<AuthLayout
					loading={loading}
					authTitle={t('sign up')}
					helpText={t("Don't have an account? Create your account, it takes less than a minute.")}
					bottomLinks={<BottomLink msg={t('Already have an account?')} url="/auth/login" linkTitle="Login" />}
				>
					<form onSubmit={handleSubmit} className="relative grid grid-cols-2 md:grid-cols-3 items-end gap-3 last:col-span-3 nth-9:col-span-3">
						<div className="col-span-3 flex justify-start">
							<ProfileImageUpload onChange={e => handleChange('avatar', e)} className="mb-5 col-span-2" />
						</div>
						<FormInput
							required
							label={t('f_name')}
							onChange={e => handleChange('f_name', e.target.value)}
							value={data?.f_name}
							name="f_name"
							type="text"
							placeholder={t('f_name')}
							containerClass="mb-6 space-y-2"
						/>
						<FormInput
							required
							label={t('l_name')}
							type="text"
							onChange={e => handleChange('l_name', e.target.value)}
							value={data?.l_name}
							name="l_name"
							placeholder={t('l_name')}
							containerClass="mb-6 space-y-2"
						/>
						<FormInput
							required
							label={t('email')}
							type="text"
							onChange={e => handleChange('email', e.target.value)}
							value={data?.email}
							name="email"
							placeholder={t('email')}
							containerClass="mb-6 space-y-2"
						/>
						<FormInput required label={t('phone')} onChange={e => handleChange('phone', e.target.value)} value={data?.phone} type="phone" name="phone" className="w-full" containerClass="space-y-2" />
						<CustomSelect
							label={t('branch')}
							onChange={(e: any) => handleChange('branch_id', e?.id)}
							options={branches}
							value={setSelect(branches, data?.branch_id)}
							name="branch_id"
							placeholder={t('select')}
							optionLabel={'localized_name'}
							optionValue={'id'}
						/>
						<FormInput
							required
							label={t('password')}
							type="password"
							onChange={e => handleChange('password', e.target.value)}
							value={data?.password}
							name="password"
							placeholder={t('enter your password')}
							containerClass="space-y-2"
						/>
						<FormInput
							required
							label={t('confirm password')}
							onChange={e => handleChange('password_confirmation', e.target.value)}
							value={data?.password_confirmation}
							type="password"
							name="password_confirmation"
							placeholder={t('confirm password')}
							containerClass="space-y-2"
						/>
						<div className="col-span-3">
							<FormInput
								onChange={e => handleChange('terms', e.target.checked)}
								value={data?.terms}
								label={t('I accept Terms and Conditions')}
								type="checkbox"
								name="terms"
								containerClass="mb-6"
								defaultChecked
							/>
							<Button type="submit">{t('sign up')}</Button>
						</div>
					</form>
				</AuthLayout>
			</AuthContainer>
		</>
	)
}

export default Signup
