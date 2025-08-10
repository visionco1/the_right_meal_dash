import { FileUploader, FormInput } from '@/components'
import { Button } from '@/components/ui/button'
import CustomSelect from '@/components/ui/custom-select'
import { setSelect } from '@/helpers/helpers'
import { useGetOrders } from '../orders/hooks'
import { useGetAllUsers } from '../customers/hooks'
import { useTranslation } from 'react-i18next'
import { Loading } from '@/components/ui/Loading'
import { Dispatch, SetStateAction } from 'react'

const ComplaintsForm = ({
	loading = false,
	createLoading,
	updateLoading = false,
	handleChange,
	setOpenModal,
	handleSubmit,
	data,
	showResponse
}: {
	loading?: boolean
	createLoading: boolean
	updateLoading?: boolean
	handleChange: (name: string, value: any) => void
	setOpenModal: Dispatch<SetStateAction<boolean>>
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	data: any
	showResponse?: any
}) => {
	const { t } = useTranslation()
	const { data: users } = useGetAllUsers({ is_paginated: 0 })
	const { data: orders } = useGetOrders({ is_paginated: 0 })
	return (
		<form onSubmit={handleSubmit}>
			{(loading || createLoading || updateLoading) && <Loading />}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
				<CustomSelect
					onChange={(e: any) => handleChange('user_id', e?.id)}
					label={t('customer')}
					placeholder={t('select_customer')}
					options={users?.data?.data}
					value={setSelect(users?.data?.data, data?.user_id)}
					isClearable
					optionLabel="name"
					optionValue="id"
				/>
				<CustomSelect
					onChange={(e: any) => handleChange('order_day_id', e?.id)}
					label={t('order')}
					placeholder={t('select_order')}
					options={orders?.data?.data}
					value={setSelect(orders?.data?.data, data?.order_day_id)}
					isClearable
					optionLabel="localized_sub_name"
					optionValue="id"
				/>
				<div className="col-span-1 lg:col-span-2">
					<FormInput type="textarea" value={data.message} onChange={e => handleChange('message', e.target.value)} name="message" label={t('message')} placeholder={t('enter_message')} />
					<FormInput type="textarea" value={data.note} onChange={e => handleChange('note', e.target.value)} name="note" label={t('note')} placeholder={t('enter_note')} />
				</div>
				<div className="col-span-1 lg:col-span-2">
					<FileUploader defaultImage={showResponse?.data?.image?.url || null} value={data?.image} onFileUpload={(e: any) => handleChange('image', e?.[0])} text={t('upload_image_instruction')} />
				</div>
			</div>
			<div className="my-5 flex gap-3">
				<Button variant="primary" type="submit">
					{t('save')}
				</Button>
				<Button variant="light" onClick={() => setOpenModal(false)}>
					{t('cancel')}
				</Button>
			</div>
		</form>
	)
}

export default ComplaintsForm
