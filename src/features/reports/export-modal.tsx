import CustomModal from '@/components/ui/custom-modal'
import CustomSwitch from '@/components/ui/custom-switch'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { Loading } from '@/components/ui/Loading'
import { Dispatch, SetStateAction } from 'react'
import { TExportData } from './types'

type TProps = {
    keys: string[]
    title: string
    handleSubmit: (data: any) => void
    handleChange: (key: string, value: any) => void
    data?: any
    loading: boolean
    open: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
}
const ExportModal = ({
    keys,
    handleChange,
    handleSubmit,
    setOpenModal,
    open,
    data,
    loading,
    title
}: TProps) => {
    const { t } = useTranslation()

    return (
        <CustomModal
            titleHead={title}
            isOpen={open}
            setIsOpen={setOpenModal}
            open={open}
            closeOnClickOut={true}
            position='top'
            buttonContent={<Button variant={'primary'}>{title}</Button>}
            body={
                <form onSubmit={handleSubmit}>
                    {loading && <Loading />}
                    <div className='pt-5 min-w-[400px] w-auto p-3 flex gap-3 flex-wrap items-center justify-between'>
                        {keys?.map((item: string) => {
                            return (
                                <CustomSwitch
                                    key={item}
                                    className='flex flex-col'
                                    label={item?.replace('_', ' ')}
                                    onChange={(e: any) => {
                                        const checked = e.target.checked
                                        handleChange(
                                            'list',
                                            checked
                                                ? [...data?.list, item]
                                                : data?.list.filter((e: string) => e != item)
                                        )
                                    }}
                                    defaultChecked={data?.list.includes(item)}
                                    id={item}
                                    labelOff='off'
                                    labelOn='on'
                                />
                            )
                        })}
                    </div>
                    <div className='my-5 flex gap-2'>
                        <Button type='submit' variant='primary'>
                            {t('export')}
                        </Button>
                        <Button type='button' variant='light' onClick={() => setOpenModal(false)}>
                            {t('cancel')}
                        </Button>
                    </div>
                </form>
            }
        />
    )
}

export default ExportModal
