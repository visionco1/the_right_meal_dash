import { useExport } from './hooks'
import { exportFinanceApi } from './api'
import ExportModal from './export-modal'
import { useTranslation } from 'react-i18next'

const ExportFinance = ({ date }: { date: string }) => {
    const { t } = useTranslation()

    const { handleSubmit, handleChange, loading, data, setOpenModal, open, keys } = useExport({
        date,
        api: exportFinanceApi,
        keys: ['customer', 'plan', 'status', 'version', 'price']
    })

    return (
        <ExportModal
            data={data}
            open={open}
            keys={keys}
            loading={loading}
            title={t('Finance Report')}
            setOpenModal={setOpenModal}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    )
}

export default ExportFinance
