import { Button } from '@/components/ui/button'
import CustomSwitch from '@/components/ui/custom-switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { Loading } from '@/components/ui/Loading'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useShiftHook, useUpdateShift } from './hooks'
import { TShift } from './type'
import { removeTrailingZeros } from '@/helpers/helpers'
import ConfirmModal from '@/components/modals/confirm-modal'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import CreateShift from './create'
import UpdateShift from './update'

const Content = () => {
	const { t } = useTranslation()
	const {
		loading,
		data,
		getPage,
		handleDelete,
		onDownload,
		handleDeleteModal,
		onSearch,
		search,
		permission,
		deleteLoading,
		openDeleteModal,
		setOpenDeleteModal,
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	} = useShiftHook()
	const { updateLoading, handleSubmit, handleChange, values, openEditModal, setOpenEditModal, handleOpenModal, showLoading } = useUpdateShift()
	return (
		<Card>
			<CardHeader>
				<Button variant={'light'} onClick={onDownload}>
					{t('export_excel')}
				</Button>
				{permission('store') && <CreateShift />}
				{permission('update') && (
					<UpdateShift
						open={openEditModal}
						showLoading={showLoading}
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						setOpenModal={setOpenEditModal}
						data={values}
						updateLoading={updateLoading}
					/>
				)}
				{permission('destroy') && (
					<ConfirmModal loading={deleteLoading} handleClick={handleDelete} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} message={t('delete_shift_confirm')} btnValue={t('delete')} />
				)}
				<ConfirmModal
					loading={statusLoading}
					handleClick={handleChangeStatusModal}
					openModal={openStatusModal}
					setOpenModal={setOpenStatusModal}
					message={t('change_status_confirm')}
					btnValue={t('change')}
				/>
			</CardHeader>

			<CardBody>
				{loading && <Loading />}
				<TableSearch search={search} onSearch={onSearch} />
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>{t('start_at')}</TableHead>
							<TableHead>{t('end_at')}</TableHead>
							<TableHead>{t('status')}</TableHead>
							<TableHead>{t('actions')}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.data?.data?.map((item: TShift, i: number) => {
							return (
								<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
									<TableCell>{removeTrailingZeros(item?.new_from)}</TableCell>
									<TableCell>{removeTrailingZeros(item?.new_to)}</TableCell>
									<TableCell>
										<CustomSwitch onChange={() => handleOpenStatusModal(item?.id as any)} defaultChecked={item?.is_active} id={i} labelOff={t('off')} labelOn={t('on')} />
									</TableCell>
									<TableCell>
										<div className="h-full flex gap-2 justify-start items-center">
											<Icon onClick={() => handleOpenModal(item?.id as any)} icon={<FaEdit className="text-green-500" />} />
											<Icon onClick={() => handleDeleteModal(item?.id)} icon={<FaTrash className="text-red-600" />} />
										</div>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
				<TablePagination data={data?.data?.meta} onPageChange={(page: number) => getPage(page)} />
			</CardBody>
		</Card>
	)
}

export default Content
