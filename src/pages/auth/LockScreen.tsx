import { Link } from 'react-router-dom'
// components
import { FormInput } from '../../components'
import { AuthLayout } from '@/features/auth'
import { AuthContainer } from '@/features/auth'
import { useTranslation } from 'react-i18next'
import { t } from 'i18next'
import { useState } from 'react'
import { handleChangeState } from '@/helpers/helpers'

// bottom links
const BottomLink = () => {
	const { t } = useTranslation()
	return (
		<div className="text-center my-4">
			<p className="text-muted">
				{t('Not you? return')}
				<Link to="/auth/register" className="text-muted ms-1 link-offset-3 underline underline-offset-4">
					<b>{t('sign up')}</b>
				</Link>
			</p>
		</div>
	)
}

const LockScreen = () => {
	const [data, setData] = useState<any>({})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(data.password)
	}
	const handleChange = (key: string, value: any) => {
		handleChangeState(setData, data, key, value)
	}
	return (
		<>
			<AuthContainer>
				<AuthLayout authTitle={t('reset password')} helpText={t("Enter your email address and we'll send you an email with instructions to reset your password.")} bottomLinks={<BottomLink />}>
					<form onSubmit={handleSubmit}>
						<FormInput
							label={t('password')}
							labelClassName="font-semibold text-gray-500"
							type="password"
							name="password"
							onChange={e => handleChange('password', e.target.value)}
							value={data?.password}
							placeholder={t('enter your password')}
							containerClass="mb-6 space-y-2"
							className="form-input"
							required
						/>

						<div className="text-center mb-6">
							<button className="btn bg-primary text-white" type="submit">
								{t('reset password')}
							</button>
						</div>
					</form>
				</AuthLayout>
			</AuthContainer>
		</>
	)
}

export default LockScreen
