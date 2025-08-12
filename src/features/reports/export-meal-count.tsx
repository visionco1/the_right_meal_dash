import { useExport } from './hooks'
import ExportModal from './export-modal'
import { exportMealCountApi } from './api'
import { useTranslation } from 'react-i18next'

const ExportMealCount = ({ date }: { date: string }) => {
    const { t } = useTranslation()

    const { handleSubmit, handleChange, loading, data, setOpenModal, open, keys } = useExport({
        date,
        api: exportMealCountApi,
        keys: ['meal_name', 'plan', 'count']
    })

    return (
        <ExportModal
            data={data}
            open={open}
            keys={keys}
            loading={loading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setOpenModal={setOpenModal}
            title={t('Meal Count Report')}
        />
    )
}

export default ExportMealCount
