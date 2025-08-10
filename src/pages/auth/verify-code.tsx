import { Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { usePasswordVerifyCodeHook } from '@/features/auth/hooks'
import { FormInput, PageBreadcrumb } from '@/components'
import { AuthContainer, AuthLayout } from '@/features/auth'
import { useTranslation } from 'react-i18next'

const VerifyCode = () => {
	const { t } = useTranslation()
	const { response, loading, handleSubmit, handleChange, data, redirectUrl } = usePasswordVerifyCodeHook()
	return (
		<>
			<PageBreadcrumb title={t('verify code')} />
			{response ? <Navigate to={redirectUrl}></Navigate> : null}
			<AuthContainer>
				<AuthLayout loading={loading} hasForm={false} helpText={t('the code sent to your email')} authTitle={t('Please check your email')}>
					<form onSubmit={handleSubmit} className="relative grid grid-cols-1 items-end gap-3">
						<FormInput required label={t('code')} onChange={e => handleChange('code', e.target.value)} value={data?.code} type="text" name="code" placeholder={t('enter your code')} />
						<Button type="submit" className="w-fit">
							{t('send')}
						</Button>
					</form>
				</AuthLayout>
			</AuthContainer>
		</>
	)
}

export default VerifyCode
