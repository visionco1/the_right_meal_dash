import { useExportQuality } from './hooks'
import { useTranslation } from 'react-i18next'
import ExportModal from './export-modal'

const ExportQualityReport = ({ date }: { date: string }) => {
	const { t } = useTranslation()
	const { handleSubmit, handleChange, loading, data, setOpenModal, open } = useExportQuality(date)
	const keys = ['note', 'captain', 'subscription', 'customer', 'delivery_time', 'quality_man']
	return <ExportModal title={t('export quality report')} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} data={data} setOpenModal={setOpenModal} open={open} keys={keys} />
}

export default ExportQualityReport
