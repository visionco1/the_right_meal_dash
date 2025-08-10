import { useExportNotes } from './hooks'
import { useTranslation } from 'react-i18next'
import ExportModal from './export-modal'

const ExportNotes = ({ date }: { date: string }) => {
	const { t } = useTranslation()
	const { handleSubmit, handleChange, loading, data, setOpenModal, open } = useExportNotes(date)
	const keys = ['notes', 'captain', 'subscription', 'customer']
	return <ExportModal title={t('export_notes')} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} data={data} setOpenModal={setOpenModal} open={open} keys={keys} />
}

export default ExportNotes
