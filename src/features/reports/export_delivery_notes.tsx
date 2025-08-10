import { useExportDeliveryNotes } from './hooks'
import { useTranslation } from 'react-i18next'
import ExportModal from './export-modal'

const ExportDeliveryNotes = ({ date }: { date: string }) => {
	const { t } = useTranslation()
	const { handleSubmit, handleChange, loading, data, setOpenModal, open } = useExportDeliveryNotes(date)
	const keys = ['customer', 'plan', 'captain', 'notes', 'zone', 'delivery_period']
	return <ExportModal title={t('export_delivery_notes')} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} data={data} setOpenModal={setOpenModal} open={open} keys={keys} />
}

export default ExportDeliveryNotes
