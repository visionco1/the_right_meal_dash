import { useExport } from './hooks'
import ExportModal from './export-modal'
import { useTranslation } from 'react-i18next'
import { exportDeliveryNotesApi } from './api'

const ExportDeliveryNotes = ({ date }: { date: string }) => {
    const { t } = useTranslation()

    const { handleSubmit, handleChange, loading, data, setOpenModal, open, keys } = useExport({
        date,
        api: exportDeliveryNotesApi,
        keys: ['customer', 'plan', 'captain', 'notes', 'zone', 'delivery_period']
    })

    // ['customer', 'plan', 'status', 'version', 'price']

    return (
        <ExportModal
            data={data}
            open={open}
            keys={keys}
            loading={loading}
            title={t('export_delivery_notes')}
            setOpenModal={setOpenModal}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    )
}

export default ExportDeliveryNotes
