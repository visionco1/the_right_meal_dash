import { useBranchesHook } from '@/features/settings/branches/hooks'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custom-modal'
import { Loading } from '@/components/ui/Loading'
import CustomSwitch from '@/components/ui/custom-switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import ListItem from '@/components/ui/list-item'
import ConfirmModal from '@/components/modals/confirm-modal'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'

const Content = () => {
	const { t } = useTranslation()

	const {
		onDownload,
		tableRef,
		loading,
		data,
		getPage,
		handleDelete,
		setOpenDeleteModal,
		openDeleteModal,
		handleDeleteModal,
		deleteLoading,
		onSearch,
		permission,
		search,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal,
		statusLoading,
		openShowModal,
		setOpenShowModal,
		handleOpenShowModal,
		showLoading,
		showResponse
	} = useBranchesHook()

	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant="light" onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}
				{permission('store') && (
					<Button variant="primary" href="/settings/branches/add">
						{t('add_branch')}
					</Button>
				)}
				{permission('show') && (
					<CustomModal
						titleHead={t('branch_details')}
						classNameContent="overflow-visible"
						isOpen={openShowModal}
						setIsOpen={setOpenShowModal}
						closeOnClickOut
						position="center"
						body={
							<div className="pt-5 w-[80vw] lg:w-[40vw] p-3 min-h-[200px]">
								{showLoading && <Loading />}
								<div>
									<ListItem label={t('name_en')} value={showResponse?.data?.name?.en} />
									<ListItem label={t('name_ar')} value={showResponse?.data?.name?.ar} />
									<ListItem label={t('address')} value={showResponse?.data?.address} />
									<ListItem label={t('country')} value={showResponse?.data?.country?.localized_name} />
									<ListItem label={t('state')} value={showResponse?.data?.state?.localized_name} />
									<ListItem label={t('city')} value={showResponse?.data?.city?.localized_name} />
								</div>
							</div>
						}
					/>
				)}
				{permission('destroy') && (
					<ConfirmModal loading={deleteLoading} handleClick={handleDelete} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} message={t('confirm_delete_branch')} btnValue={t('delete')} />
				)}
				<ConfirmModal
					loading={statusLoading}
					handleClick={handleChangeStatusModal}
					openModal={openStatusModal}
					setOpenModal={setOpenStatusModal}
					message={t('confirm_change_status_branch')}
					btnValue={t('change')}
				/>
			</CardHeader>

			<CardBody>
				{loading && <Loading />}
				{permission('index') && (
					<>
						<TableSearch search={search} onSearch={onSearch} />
						<Table ref={tableRef}>
							<TableHeader>
								<TableRow>
									<TableHead>{t('full_name')}</TableHead>
									<TableHead>{t('country')}</TableHead>
									<TableHead>{t('state')}</TableHead>
									<TableHead>{t('city')}</TableHead>
									{permission('status') && <TableHead>{t('status')}</TableHead>}
									{(permission('destroy') || permission('update') || permission('show')) && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
										<TableCell>{item?.localized_name}</TableCell>
										<TableCell>{item?.country?.name}</TableCell>
										<TableCell>{item?.state?.name}</TableCell>
										<TableCell>{item?.city?.name}</TableCell>
										{permission('status') && (
											<TableCell>
												<CustomSwitch onChange={() => handleOpenStatusModal(item?.id)} defaultChecked={item?.is_active} id={i} labelOff={t('off')} labelOn={t('on')} />
											</TableCell>
										)}
										{(permission('destroy') || permission('update') || permission('show')) && (
											<TableCell>
												<div className="h-full flex gap-2 justify-start items-center">
													{permission('update') && <Icon to={`/settings/branches/edit/${item?.id}`} icon={<FaEdit className="text-green-500" />} />}
													{permission('destroy') && <Icon onClick={() => handleDeleteModal(item?.id)} icon={<FaTrash className="text-red-600" />} />}
													{permission('show') && <Icon onClick={() => handleOpenShowModal(item?.id)} icon={<FaEye className="text-blue-600" />} />}
												</div>
											</TableCell>
										)}
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

export default Content
