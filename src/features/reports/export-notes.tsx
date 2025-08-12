import { useExport } from './hooks'
import ExportModal from './export-modal'
import { exportNoteOrdersApi } from './api'
import { useTranslation } from 'react-i18next'

const ExportNotes = ({ date }: { date: string }) => {
    const { t } = useTranslation()

    const { handleSubmit, handleChange, loading, data, setOpenModal, open, keys } = useExport({
        date,
        api: exportNoteOrdersApi,
        keys: ['notes', 'captain', 'subscription', 'customer']
    })

    return (
        <ExportModal
            data={data}
            open={open}
            keys={keys}
            loading={loading}
            title={t('Notes Report')}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setOpenModal={setOpenModal}
        />
    )
}

export default ExportNotes
