import CustomSwitch from '@/components/ui/custom-switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { Loading } from '@/components/ui/Loading'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { useStaffHook, useUpdateAdmin } from './hooks'
import { Button } from '@/components/ui/button'
import ConfirmModal from '@/components/modals/confirm-modal'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import CreateStaff from './create'
import UpdateStaff from './update'

const StaffContent = () => {
	const { t } = useTranslation()
	const {
		loading,
		data,
		getPage,
		handleDelete,
		deleteLoading,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		onSearch,
		permission,
		tableRef,
		onDownload,
		handleBlockStatus,
		blockLoading,
		handleBlockModal,
		openBlockModal,
		setOpenBlockModal,
		handleUnBlockModal,
		openUnBlockModal,
		setOpenUnBlockModal,
		unblockLoading
	} = useStaffHook()

	const { updateLoading, openEditModal, setOpenEditModal, showLoading, showResponse, handleOpenModal, values, handleUpdateAdmin, handleChange } = useUpdateAdmin()
	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant={'light'} onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}
				{permission('store') && <CreateStaff />}
				{permission('update') && (
					<UpdateStaff
						data={values}
						showLoading={showLoading}
						updateLoading={updateLoading}
						open={openEditModal}
						setOpenModal={setOpenEditModal}
						handleSubmit={handleUpdateAdmin}
						handleChange={handleChange}
						showResponse={showResponse}
					/>
				)}
				<ConfirmModal loading={deleteLoading} handleClick={handleDelete} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} message={t('staff_delete_sure')} btnValue={t('delete')} />
				<ConfirmModal loading={blockLoading} handleClick={handleBlockModal} openModal={openBlockModal} setOpenModal={setOpenBlockModal} message={t('staff_block_sure')} btnValue={t('block')} />
				<ConfirmModal
					loading={unblockLoading}
					handleClick={handleUnBlockModal}
					openModal={openUnBlockModal}
					setOpenModal={setOpenUnBlockModal}
					message={t('staff_unblock_sure')}
					btnValue={t('unblock')}
				/>
			</CardHeader>
			<CardBody className="min-h-[50vh]">
				{loading && <Loading />}
				{permission('index') && (
					<>
						<TableSearch search={''} onSearch={e => onSearch(e)} />
						<Table ref={tableRef}>
							<TableHeader>
								<TableRow>
									<TableHead>{t('avatar')}</TableHead>
									<TableHead>{t('name')}</TableHead>
									<TableHead>{t('email')}</TableHead>
									<TableHead>{t('phone')}</TableHead>
									<TableHead>{t('role')}</TableHead>
									{data?.data?.permissions?.includes('block') && <TableHead>{t('status')}</TableHead>}
									{(permission('update') || permission('show') || permission('destroy')) && <TableHead>{t('options')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => {
									return (
										<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
											<TableCell>
												<img src={item?.avatar?.url} alt="admin-img" className="w-16 h-16 rounded" />
											</TableCell>
											<TableCell>{item?.name}</TableCell>
											<TableCell>{item?.email}</TableCell>
											<TableCell>{item?.phone}</TableCell>
											<TableCell>{item?.role?.localized_name}</TableCell>
											{permission('block') && permission('unblock') && (
												<TableCell>
													<CustomSwitch onChange={(e: any) => handleBlockStatus(e, item?.id)} defaultChecked={!item?.is_blocked} id={i} labelOff="off" labelOn="on" />
												</TableCell>
											)}
											{(permission('update') || permission('show') || permission('destroy')) && (
												<TableCell>
													<div className="h-full flex gap-2 justify-start items-center">
														{permission('update') && <Icon onClick={() => handleOpenModal(item?.id)} icon={<FaEdit className="text-green-500" />} className="text-md" />}
														{permission('destroy') && <Icon onClick={() => handleDeleteModal(item?.id)} icon={<FaTrash className="text-red-600" />} className="text-md" />}
														{permission('show') && <Icon to={`/staff-management/staff/${item?.id}`} icon={<FaEye className="text-blue-600" />} className="text-md" />}
													</div>
												</TableCell>
											)}
										</TableRow>
									)
								})}
							</TableBody>
						</Table>
						<TablePagination data={data?.data?.meta} onPageChange={(page: number) => getPage(page)} />
					</>
				)}
			</CardBody>
		</Card>
	)
}

export default StaffContent
