import { PageBreadcrumb } from '@/components'
import ContactUsContent from '@/features/marketing/contact-us'
import { useTranslation } from 'react-i18next'

const ContactUs = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('marketing_management'), to: '' },
		{ name: t('contact_us'), to: '/marketing-management/contact-us' }
	]
	return (
		<>
			<PageBreadcrumb title={t('contact_us')} items={items} />
			<ContactUsContent />
		</>
	)
}

export default ContactUs
