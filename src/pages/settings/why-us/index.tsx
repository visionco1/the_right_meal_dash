import { PageBreadcrumb } from '@/components'
import WhyUsContent from '@/features/settings/why-us'
import { useTranslation } from 'react-i18next'

const WhyUs = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('settings'), to: '' },
		{ name: t('why_us'), to: '/settings/why-us' }
	]

	return (
		<>
			<PageBreadcrumb title={t('why_us')} items={items} />
			<WhyUsContent />
		</>
	)
}

export default WhyUs
