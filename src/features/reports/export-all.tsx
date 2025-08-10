import { useExportAll } from './hooks'
import { useTranslation } from 'react-i18next'
import ExportModal from './export-modal'

const ExportAll = ({ date }: { date: string }) => {
	const { t } = useTranslation()
	const { handleSubmit, handleChange, loading, data, setOpenModal, open } = useExportAll(date)
	const keys = ['customer', 'subscription', 'location', 'zone', 'delivery_time', 'captain', 'note', 'delivery_note']
	return <ExportModal title={t('order notes')} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} data={data} setOpenModal={setOpenModal} open={open} keys={keys} />
}

export default ExportAll
