import { useExport } from './hooks'
import ExportModal from './export-modal'
import { exportQualityApi } from './api'
import { useTranslation } from 'react-i18next'

const ExportQualityReport = ({ date }: { date: string }) => {
    const { t } = useTranslation()

    const { handleSubmit, handleChange, loading, data, setOpenModal, open, keys } = useExport({
        date,
        api: exportQualityApi,
        keys: ['note', 'captain', 'subscription', 'customer', 'delivery_time', 'quality_man']
    })

    return (
        <ExportModal
            data={data}
            open={open}
            keys={keys}
            loading={loading}
            title={t('quality report')}
            setOpenModal={setOpenModal}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    )
}

export default ExportQualityReport
