import { useExportMealCount } from './hooks'
import { useTranslation } from 'react-i18next'
import ExportModal from './export-modal'

const ExportMealCount = ({ date }: { date: string }) => {
	const { t } = useTranslation()
	const { handleSubmit, handleChange, loading, data, setOpenModal, open } = useExportMealCount(date)
	const keys = ['meal_name', 'plan', 'count']
	return <ExportModal title={t('export_meal_count')} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} data={data} setOpenModal={setOpenModal} open={open} keys={keys} />
}

export default ExportMealCount
