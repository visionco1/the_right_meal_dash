import { PageBreadcrumb } from '@/components'
import { useTranslation } from 'react-i18next'
import Signup from '@/features/auth/signup'

const Register = () => {
	const { t } = useTranslation()
	return (
		<>
			<PageBreadcrumb title={t('sign up')} />
			<Signup />
		</>
	)
}

export default Register
