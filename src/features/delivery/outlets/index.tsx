import CustomSwitch from '@/components/ui/custom-switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { Loading } from '@/components/ui/Loading'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import ConfirmModal from '@/components/modals/confirm-modal'
import { useOutletsHook, useUpdateOutlet } from './hooks'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import CreateQualityControl from './create'
import EditQualityControl from './update'

const Outlets = () => {
	const { t } = useTranslation()
	const {
		onDownload,
		tableRef,
		showResponse,
		handleDelete,
		deleteLoading,
		loading,
		data,
		getPage,
		handleBlockStatus,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		onSearch,
		permission,
		search,
		blockLoading,
		handleBlockModal,
		openBlockModal,
		setOpenBlockModal,
		handleUnBlockModal,
		openUnBlockModal,
		setOpenUnBlockModal,
		unblockLoading
	} = useOutletsHook()
	const { updateLoading, showLoading, handleSubmit, handleChange, values, openEditModal, setOpenEditModal, handleOpenModal } = useUpdateOutlet()
	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant={'light'} onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}

				{permission('store') && <CreateQualityControl />}

				{permission('update') && (
					<EditQualityControl
						data={values}
						showLoading={showLoading}
						updateLoading={updateLoading}
						open={openEditModal}
						setOpenModal={setOpenEditModal}
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						showResponse={showResponse}
					/>
				)}

				{permission('destroy') && (
					<ConfirmModal loading={deleteLoading} handleClick={handleDelete} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} message={t('confirm_delete')} btnValue={t('delete')} />
				)}

				<ConfirmModal loading={blockLoading} handleClick={handleBlockModal} openModal={openBlockModal} setOpenModal={setOpenBlockModal} message={t('confirm_block')} btnValue={t('block')} />

				<ConfirmModal
					loading={unblockLoading}
					handleClick={handleUnBlockModal}
					openModal={openUnBlockModal}
					setOpenModal={setOpenUnBlockModal}
					message={t('confirm_unblock')}
					btnValue={t('unblock')}
				/>
			</CardHeader>

			<CardBody>
				{(loading || deleteLoading) && <Loading />}
				{permission('index') && (
					<>
						<TableSearch search={search} onSearch={onSearch} />
						<Table ref={tableRef}>
							<TableHeader>
								<TableRow>
									<TableHead>{t('name')}</TableHead>
									<TableHead>{t('email')}</TableHead>
									<TableHead>{t('phone')}</TableHead>
									{permission('block') && permission('unblock') && <TableHead>{t('status')}</TableHead>}
									{(permission('show') || permission('update') || permission('destroy')) && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
										<TableCell>{item?.name}</TableCell>
										<TableCell>{item?.email}</TableCell>
										<TableCell>{item?.phone}</TableCell>
										{permission('block') && permission('unblock') && (
											<TableCell>
												<CustomSwitch onChange={(e: any) => handleBlockStatus(e, item?.id)} defaultChecked={!item?.is_blocked} id={i} labelOff="off" labelOn="on" />
											</TableCell>
										)}
										<TableCell>
											<div className="h-full flex gap-2 justify-center items-center">
												{permission('update') && <Icon onClick={() => handleOpenModal(item?.id)} icon={<FaEdit className="text-green-500" />} className="text-md" />}
												{permission('destroy') && <Icon onClick={() => handleDeleteModal(item?.id)} icon={<FaTrash className="text-red-600" />} className="text-md" />}
												{/* {permission('show') && <Icon to={`/customers-management/customers/${item?.id}`} icon={<FaEye className="text-blue-600" />} className="text-md" />} */}
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						<TablePagination data={data?.data?.meta} onPageChange={(page: number) => getPage(page)} />
					</>
				)}
			</CardBody>
		</Card>
	)
}

export default Outlets
