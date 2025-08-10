import { Navigate } from 'react-router-dom'
import { FormInput, PageBreadcrumb } from '@/components'
import AuthContainer from '@/features/auth/AuthContainer'
import { Button } from '@/components/ui/button'
import { useConfirmEmailHook } from '@/features/auth/hooks'
import BottomLink from '@/features/auth/bottom-link'
import { AuthLayout } from '@/features/auth'
import { useTranslation } from 'react-i18next'

const ConfirmMail = () => {
	const { t } = useTranslation()
	const { verifiedUser, loading, handleSubmit, redirectUrl, handleChange, data } = useConfirmEmailHook()
	return (
		<>
			<PageBreadcrumb title={t('confirm email')} />
			{verifiedUser ? <Navigate to={redirectUrl}></Navigate> : null}
			<AuthContainer>
				<AuthLayout
					loading={loading}
					hasForm={false}
					bottomLinks={<BottomLink msg={t("Don't have an account?")} url="/auth/register" linkTitle={t('sign up')} />}
					pageImage="/images/svg/mail_sent.svg"
					helpText={t('An email has been send to your email Please check for an email from company and click on the included link to reset your password.')}
					authTitle={t('Please check your email')}
				>
					<form onSubmit={handleSubmit}>
						<div className="col-span-2">
							<FormInput onChange={e => handleChange('code', e.target.value)} value={data?.code} required label={t('code')} type="text" name="code" placeholder={t('enter your code')} />
						</div>
						<Button type="submit">{t('send')}</Button>
					</form>
				</AuthLayout>
			</AuthContainer>
		</>
	)
}

export default ConfirmMail
