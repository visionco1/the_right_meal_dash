import { Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useResetPassword } from '@/features/auth/hooks'
import { FormInput, PageBreadcrumb } from '@/components'
import { AuthContainer, AuthLayout } from '@/features/auth'
import { useTranslation } from 'react-i18next'

const ResetPassword = () => {
	const { t } = useTranslation()
	const { loading, handleChange, handleSubmit, data, redirectUrl, passwordResetSuccess } = useResetPassword()
	return (
		<>
			<PageBreadcrumb title={t('reset password')} />
			{passwordResetSuccess ? <Navigate to={redirectUrl}></Navigate> : null}
			<AuthContainer>
				<AuthLayout loading={loading} hasForm={false} authTitle={t('reset password')}>
					<form onSubmit={handleSubmit} className="relative grid grid-cols-2 items-end gap-3">
						<FormInput
							required
							onChange={e => handleChange('password', e.target.value)}
							value={data?.password}
							label="Password"
							type="password"
							name="password"
							placeholder="Enter your password"
							containerClass="space-y-2"
						/>
						<FormInput
							required
							label="Confirm Password"
							onChange={e => handleChange('password_confirmation', e.target.value)}
							value={data?.password_confirmation}
							type="password"
							name="password_confirmation"
							placeholder="Confirm your password"
							containerClass="space-y-2"
						/>
						<Button type="submit" className="w-fit">
							{t('send')}
						</Button>
					</form>
				</AuthLayout>
			</AuthContainer>
		</>
	)
}

export default ResetPassword
