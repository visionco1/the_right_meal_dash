import CustomSwitch from '@/components/ui/custom-switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { Loading } from '@/components/ui/Loading'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDeliveryMenHook, useUpdateDelivery } from './hooks'
import { Button } from '@/components/ui/button'
import ConfirmModal from '@/components/modals/confirm-modal'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import CreateDeliveryMen from './create'
import UpdateDeliveryMan from './update'

const Content = () => {
	const { t } = useTranslation()
	const {
		handleDelete,
		deleteLoading,
		loading,
		data,
		getPage,
		onSearch,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		permission,
		onDownload,
		search,
		handleBlockStatus,
		blockLoading,
		handleBlockModal,
		openBlockModal,
		setOpenBlockModal,
		handleUnBlockModal,
		openUnBlockModal,
		setOpenUnBlockModal,
		unblockLoading
	} = useDeliveryMenHook()
	const { updateLoading, handleUpdateDelivery, openEditModal, setOpenEditModal, handleOpenModal, values, showResponse, showLoading, handleChange } = useUpdateDelivery()
	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant={'light'} onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}
				{permission('store') && <CreateDeliveryMen />}
				{permission('update') && (
					<UpdateDeliveryMan
						data={values}
						showLoading={showLoading}
						updateLoading={updateLoading}
						open={openEditModal}
						setOpenModal={setOpenEditModal}
						handleSubmit={handleUpdateDelivery}
						handleChange={handleChange}
						showResponse={showResponse}
					/>
				)}
				{permission('destroy') && (
					<ConfirmModal
						loading={deleteLoading}
						handleClick={handleDelete}
						openModal={openDeleteModal}
						setOpenModal={setOpenDeleteModal}
						message={t('are_you_sure_delete_delivery_man')}
						btnValue={t('delete')}
					/>
				)}
				<ConfirmModal
					loading={blockLoading}
					handleClick={handleBlockModal}
					openModal={openBlockModal}
					setOpenModal={setOpenBlockModal}
					message={t('are_you_sure_block_delivery_man')}
					btnValue={t('block')}
				/>
				<ConfirmModal
					loading={unblockLoading}
					handleClick={handleUnBlockModal}
					openModal={openUnBlockModal}
					setOpenModal={setOpenUnBlockModal}
					message={t('are_you_sure_unblock_delivery_man')}
					btnValue={t('unblock')}
				/>
			</CardHeader>
			<CardBody>
				{(loading || deleteLoading) && <Loading />}
				{permission('index') && (
					<>
						<TableSearch search={search} onSearch={onSearch} />
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>{t('image')}</TableHead>
									<TableHead>{t('name')}</TableHead>
									<TableHead>{t('email')}</TableHead>
									<TableHead>{t('phone')}</TableHead>
									{permission('status') && <TableHead>{t('status')}</TableHead>}
									{(permission('show') || permission('update') || permission('destroy')) && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
										<TableCell>
											<img src={item?.avatar?.url} alt="admin-img" className="w-16 min-w-16 h-16 rounded" />
										</TableCell>
										<TableCell>{item?.name}</TableCell>
										<TableCell>{item?.email}</TableCell>
										<TableCell>{item?.phone}</TableCell>
										{permission('status') && (
											<TableCell>
												<CustomSwitch onChange={(e: any) => handleBlockStatus(e, item?.id)} defaultChecked={item?.is_blocked} id={i} labelOff={t('off')} labelOn={t('on')} />
											</TableCell>
										)}
										{(permission('show') || permission('update') || permission('destroy')) && (
											<TableCell>
												<div className="h-full flex gap-2 justify-start items-center">
													{permission('update') && <Icon onClick={() => handleOpenModal(item?.id)} icon={<FaEdit className="text-green-500" />} className="text-md" />}
													{permission('destroy') && <Icon onClick={() => handleDeleteModal(item?.id)} icon={<FaTrash className="text-red-600" />} className="text-md" />}
												</div>
											</TableCell>
										)}
									</TableRow>
								))}
							</TableBody>
						</Table>
						<TablePagination data={data?.data?.meta} onPageChange={page => getPage(page)} />
					</>
				)}
			</CardBody>
		</Card>
	)
}

export default Content
