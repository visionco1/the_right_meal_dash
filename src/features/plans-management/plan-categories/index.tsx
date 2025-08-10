import { Button } from '@/components/ui/button'
import CustomSwitch from '@/components/ui/custom-switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { Loading } from '@/components/ui/Loading'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { usePlanCategoriesHook, useUpdatePlanCategory } from './hooks'
import ConfirmModal from '@/components/modals/confirm-modal'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import CreatePlanCategory from './create'
import UpdatePlanCategory from './update'

const PlanCategoriesContent = () => {
	const { t } = useTranslation()
	const {
		tableRef,
		onDownload,
		permission,
		data,
		loading,
		getPage,
		deleteLoading,
		handleDelete,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		onSearch,
		search,
		statusLoading,
		openStatusModal,
		setOpenStatusModal,
		handleChangeStatusModal,
		handleOpenStatusModal
	} = usePlanCategoriesHook()
	const { updateLoading, openEditModal, setOpenEditModal, handleOpenModal, showLoading, showResponse, values, handleSubmit, handleChange } = useUpdatePlanCategory()
	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant="light" onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}

				{permission('store') && <CreatePlanCategory />}

				{permission('update') && (
					<UpdatePlanCategory
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
					<ConfirmModal
						loading={deleteLoading}
						handleClick={handleDelete}
						openModal={openDeleteModal}
						setOpenModal={setOpenDeleteModal}
						message={t('delete_plan_category_confirm')}
						btnValue={t('delete')}
					/>
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
				{permission('index') && (
					<>
						<TableSearch search={search} onSearch={onSearch} />
						<Table ref={tableRef}>
							<TableHeader>
								<TableRow>
									<TableHead>{t('image')}</TableHead>
									<TableHead>{t('name')}</TableHead>
									{permission('status') && <TableHead>{t('status')}</TableHead>}
									{(permission('update') || permission('destroy')) && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
										<TableCell>
											<img src={item?.image?.url} alt="plan-category-img" className="w-16 h-16 rounded" />
										</TableCell>
										<TableCell>{item?.localized_name}</TableCell>
										{permission('status') && (
											<TableCell>
												<CustomSwitch onChange={() => handleOpenStatusModal(item?.id)} defaultChecked={item?.is_active} id={i} labelOff={t('off')} labelOn={t('on')} />
											</TableCell>
										)}
										{(permission('update') || permission('destroy')) && (
											<TableCell>
												<div className="h-full flex gap-2 justify-start items-center">
													{permission('update') && <Icon onClick={() => handleOpenModal(item?.id)} icon={<FaEdit className="text-green-500" />} />}
													{permission('destroy') && <Icon onClick={() => handleDeleteModal(item?.id)} icon={<FaTrash className="text-red-600" />} />}
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

export default PlanCategoriesContent
