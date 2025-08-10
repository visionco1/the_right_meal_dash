import { Button } from '@/components/ui/button'
import CustomSwitch from '@/components/ui/custom-switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { Loading } from '@/components/ui/Loading'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { useMealHook } from './hooks'
import ConfirmModal from '@/components/modals/confirm-modal'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'

const MealsContent = () => {
	const { t } = useTranslation()
	const {
		tableRef,
		onDownload,
		loading,
		data,
		getPage,
		handleDelete,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		deleteLoading,
		onSearch,
		permission,
		search,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal,
		statusLoading
	} = useMealHook()

	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant={'light'} onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}
				{permission('store') && <Button href="/menu-management/meals/add">{t('add_meal')}</Button>}
				{permission('destroy') && (
					<ConfirmModal loading={deleteLoading} handleClick={handleDelete} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} message={t('meal_delete_sure')} btnValue={t('delete')} />
				)}
				<ConfirmModal
					loading={statusLoading}
					handleClick={handleChangeStatusModal}
					openModal={openStatusModal}
					setOpenModal={setOpenStatusModal}
					message={t('status_change_sure')}
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
									<TableHead>{t('name')}</TableHead>
									<TableHead>{t('meal_category')}</TableHead>
									<TableHead>{t('country')}</TableHead>
									<TableHead>{t('calories')}</TableHead>
									<TableHead>{t('outlet_price_after_discount')}</TableHead>
									{permission('status') && <TableHead>{t('status')}</TableHead>}
									{(permission('update') || permission('destroy') || permission('show')) && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => {
									return (
										<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
											<TableCell>{item?.localized_name}</TableCell>
											<TableCell>{item?.meal_category}</TableCell>
											<TableCell>{item?.country?.localized_name}</TableCell>
											<TableCell className="flex items-center gap-1">
												{item?.calories?.map((item: any, i: number) => {
													return (
														<span key={i} className="bg-primary py-1 px-2 text-white rounded-full text-xs">
															{item?.calories}
														</span>
													)
												})}
											</TableCell>
											<TableCell>
												{item?.prices?.length > 0 && (
													<span className="bg-primary py-1 px-2 text-white rounded-full text-xs">
														{item?.prices?.reduce((acc: any, item: any) => acc + parseFloat(item?.outlet_price_after_discount), 0) / item?.prices?.length}
													</span>
												)}
											</TableCell>
											{permission('status') && (
												<TableCell>
													<CustomSwitch onChange={() => handleOpenStatusModal(item?.id)} defaultChecked={item?.is_active} id={i} labelOff={t('off')} labelOn={t('on')} />
												</TableCell>
											)}
											{(permission('update') || permission('destroy') || permission('show')) && (
												<TableCell>
													<div className="h-full flex gap-2 justify-start items-center">
														{permission('update') && <Icon to={`/menu-management/meals/edit/${item?.id}`} icon={<FaEdit className="text-green-500" />} />}
														{permission('show') && <Icon to={`/menu-management/meals/view/${item?.id}`} icon={<FaEye className="text-blue-600" />} className="text-md" />}
														{permission('destroy') && <Icon onClick={() => handleDeleteModal(item?.id)} icon={<FaTrash className="text-red-600" />} />}
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

export default MealsContent
