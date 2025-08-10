import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import { Button } from '@/components/ui/button'
import { useChangeRoleStatus, useRolesHook } from '@/features/staff/roles/hooks'
import { Loading } from '@/components/ui/Loading'
import Icon from '@/components/ui/icon'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import CustomSwitch from '@/components/ui/custom-switch'
import ConfirmModal from '@/components/modals/confirm-modal'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'

const RolesContent = () => {
	const { t } = useTranslation()
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal, loading, data, getPage, onSearch, permission, tableRef, onDownload } = useRolesHook()

	const { handleBlockStatus, blockLoading, handleBlockModal, openBlockModal, setOpenBlockModal, handleUnBlockModal, openUnBlockModal, setOpenUnBlockModal, unblockLoading } = useChangeRoleStatus()

	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant={'light'} onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}
				{permission('store') && (
					<Link to={'/staff-management/roles/add'} type="button" className="bg-primary btn text-white mx-1 hover:bg-white hover:text-primary">
						{t('add')}
					</Link>
				)}
				{permission('destroy') && (
					<ConfirmModal loading={deleteLoading} handleClick={handleDelete} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} message={t('role_delete_sure')} btnValue={t('delete')} />
				)}
				<ConfirmModal loading={blockLoading} handleClick={handleBlockModal} openModal={openBlockModal} setOpenModal={setOpenBlockModal} message={t('role_block_sure')} btnValue={t('block')} />
				<ConfirmModal
					loading={unblockLoading}
					handleClick={handleUnBlockModal}
					openModal={openUnBlockModal}
					setOpenModal={setOpenUnBlockModal}
					message={t('role_unblock_sure')}
					btnValue={t('un_block')}
				/>
			</CardHeader>
			<CardBody>
				{(loading || deleteLoading) && <Loading />}
				{permission('index') && (
					<>
						<TableSearch search={''} onSearch={e => onSearch(e)} />
						<Table ref={tableRef}>
							<TableHeader>
								<TableRow>
									{/* <TableHead>ID</TableHead> */}
									<TableHead>{t('name')}</TableHead>
									{permission('block') && permission('unblock') && <TableHead>{t('status')}</TableHead>}
									{(permission('update') || permission('destroy') || permission('show')) && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => {
									return (
										<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
											{/* <TableCell>{item?.id}</TableCell> */}
											<TableCell>{item?.name?.en}</TableCell>
											{permission('block') && permission('unblock') && (
												<TableCell>
													<CustomSwitch onChange={e => handleBlockStatus(e, item?.id)} defaultChecked={!item?.is_blocked} id={i} labelOff={t('un_block')} labelOn={t('block')} />
												</TableCell>
											)}
											<TableCell>
												<div className="h-full flex gap-2 justify-start items-center">
													{permission('update') && <Icon to={`/staff-management/roles/update/${item?.id}`} icon={<FaEdit className="text-green-500" />} />}
													{permission('destroy') && <Icon onClick={() => handleDeleteModal(item?.id)} icon={<FaTrash className="text-red-600" />} />}
													{permission('show') && <Icon to={`/staff-management/roles/${item?.id}`} icon={<FaEye className="text-blue-600" />} />}
												</div>
											</TableCell>
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

export default RolesContent
