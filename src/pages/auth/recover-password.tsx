import { useRecoverPassword } from '@/features/auth/hooks'
import BottomLink from '@/features/auth/bottom-link'
import { Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { AuthContainer, AuthLayout } from '@/features/auth'
import { FormInput, PageBreadcrumb } from '@/components'
import { useTranslation } from 'react-i18next'

const RecoverPassword = () => {
	const { t } = useTranslation()
	const { loading, handleChange, handleSubmit, data, passwordCodeSent, redirectUrl } = useRecoverPassword()
	return (
		<>
			<PageBreadcrumb title="Recover Password" />
			{passwordCodeSent ? <Navigate to={redirectUrl}></Navigate> : null}
			<AuthContainer>
				<AuthLayout
					loading={loading}
					authTitle={t('forgot your password')}
					helpText={t("Enter your email address and we'll send you an email with instructions to reset your password.")}
					bottomLinks={<BottomLink msg={'Back to'} url="/auth/login" linkTitle="Login" />}
				>
					<form onSubmit={handleSubmit}>
						<FormInput
							onChange={e => handleChange('email', e.target.value)}
							value={data?.email}
							label={t('email')}
							type="text"
							name="username"
							placeholder={t('email')}
							containerClass="mb-6 space-y-2"
							className="form-input"
							required
						/>
						<Button type="submit">{t('send')}</Button>
					</form>
				</AuthLayout>
			</AuthContainer>
		</>
	)
}

export default RecoverPassword
