import { useStatesHook, useUpdateState } from '@/features/settings/states/hooks'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/ui/Loading'
import CustomSwitch from '@/components/ui/custom-switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { FaEdit, FaPaperclip, FaTrash } from 'react-icons/fa'
import ConfirmModal from '@/components/modals/confirm-modal'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import CreateState from './create'
import UpdateState from './update'

const Content = () => {
	const { t } = useTranslation()
	const {
		onDownload,
		tableRef,
		country_id,
		loading,
		data,
		getPage,
		deleteLoading,
		handleDelete,
		statusLoading,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		onSearchState,
		permission,
		search,
		handleChangeStatusModal,
		handleOpenStatusModal,
		setOpenStatusModal,
		openStatusModal
	} = useStatesHook()
	const { updateLoading, handleUpdate, openEditModal, setOpenEditModal, handleOpenModal, updatedData, showLoading, handleChange, handleSubmit } = useUpdateState()
	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant="light" onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}
				{permission('store') && <CreateState />}
				{permission('update') && (
					<UpdateState
						data={updatedData}
						showLoading={showLoading}
						updateLoading={updateLoading}
						open={openEditModal}
						setOpenModal={setOpenEditModal}
						handleSubmit={handleSubmit}
						handleChange={handleChange}
					/>
				)}
				{permission('destroy') && (
					<ConfirmModal loading={deleteLoading} handleClick={handleDelete} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} message={t('confirm_delete_state')} btnValue={t('delete')} />
				)}
				<ConfirmModal
					loading={statusLoading}
					handleClick={handleChangeStatusModal}
					openModal={openStatusModal}
					setOpenModal={setOpenStatusModal}
					message={t('confirm_change_status_state')}
					btnValue={t('change')}
				/>
			</CardHeader>
			<CardBody>
				{loading && <Loading />}
				{permission('show') && (
					<>
						<TableSearch search={search} onSearch={onSearchState} />
						<Table ref={tableRef}>
							<TableHeader>
								<TableRow>
									<TableHead>{t('name')}</TableHead>
									{permission('status') && <TableHead>{t('status')}</TableHead>}
									{(permission('destroy') || permission('update') || permission('show')) && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}>
										<TableCell>{item.localized_name}</TableCell>
										{permission('status') && (
											<TableCell>
												<CustomSwitch onChange={() => handleOpenStatusModal(item.id)} defaultChecked={item.is_active} id={i} labelOff={t('off')} labelOn={t('on')} />
											</TableCell>
										)}
										{(permission('destroy') || permission('update') || permission('show')) && (
											<TableCell>
												<div className="flex gap-2">
													{permission('update') && <Icon onClick={() => handleOpenModal(item.id)} icon={<FaEdit className="text-green-500" />} />}
													{permission('destroy') && <Icon onClick={() => handleDeleteModal(item.id)} icon={<FaTrash className="text-red-600" />} />}
													{permission('show') && <Icon to={`/settings/countries/${country_id}/state/${item.id}`} icon={<FaPaperclip className="text-blue-600" />} />}
												</div>
											</TableCell>
										)}
									</TableRow>
								))}
							</TableBody>
						</Table>
						<TablePagination data={data?.data?.meta} onPageChange={getPage} />
					</>
				)}
			</CardBody>
		</Card>
	)
}

export default Content
