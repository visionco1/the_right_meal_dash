import { PageBreadcrumb } from '@/components'
import PackagingReportContent from '@/features/reports'
import { useTranslation } from 'react-i18next'

const PackagingReport = () => {
	const { t } = useTranslation()
	const items = [
		{ name: t('reports'), to: '' },
		{ name: t('packaging_report'), to: '/reports/packaging-report' }
	]

	return (
		<>
			<PageBreadcrumb title={t('packaging_report')} items={items} />
			<PackagingReportContent />
		</>
	)
}

export default PackagingReport
