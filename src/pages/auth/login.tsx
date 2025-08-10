import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useLoginHook } from '@/features/auth/hooks'
import { AuthContainer, AuthLayout } from '@/features/auth'
import { FormInput } from '@/components'
import { useTranslation } from 'react-i18next'

const PasswordInputChild = () => {
	const { t } = useTranslation()
	return (
		<Link to="/auth/recover-password" className="text-muted text-xs underline decoration-dashed underline-offset-4">
			{t('forgot_password')}
		</Link>
	)
}

const Login = () => {
	const { t } = useTranslation()
	const { loading, onSubmit, handleChange, data } = useLoginHook()

	return (
		<AuthContainer>
			<AuthLayout loading={loading} authTitle={t('login')} helpText={t('login_help_text')}>
				<form onSubmit={onSubmit}>
					<FormInput
						label={t('email')}
						type="email"
						onChange={e => handleChange('username', e.target.value)}
						value={data?.username}
						placeholder={t('enter_email')}
						containerClass="mb-6 space-y-2"
						required
					/>
					<FormInput
						label={t('password')}
						type="password"
						name="password"
						placeholder={t('enter_password')}
						onChange={e => handleChange('password', e.target.value)}
						value={data?.password}
						containerClass="mb-6 space-y-2"
						labelContainerClassName="flex justify-between items-center mb-2"
						required
					>
						<PasswordInputChild />
					</FormInput>
					<FormInput label={t('remember_me')} type="checkbox" name="checkbox" containerClass="mb-6" defaultChecked />
					<div className="flex justify-center mb-6">
						<Button type="submit" disabled={loading}>
							{t('login')}
						</Button>
					</div>
				</form>
			</AuthLayout>
		</AuthContainer>
	)
}

export default Login
