import ConfirmModal from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import CustomSwitch from '@/components/ui/custom-switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { Loading } from '@/components/ui/Loading'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useCouponsHook } from './hooks'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'

const CouponsContent = () => {
	const { t } = useTranslation()
	const {
		onDownload,
		tableRef,
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
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	} = useCouponsHook()

	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant={'light'} onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}
				{permission('store') && (
					<Button href="/marketing-management/coupons/add" variant={'primary'} onClick={onDownload}>
						{t('add_coupon')}
					</Button>
				)}
				{permission('destroy') && (
					<ConfirmModal loading={deleteLoading} handleClick={handleDelete} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} message={t('delete_coupon_confirm')} btnValue={t('delete')} />
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
									<TableHead>{t('name')}</TableHead>
									<TableHead>{t('code')}</TableHead>
									<TableHead>{t('discount')}</TableHead>
									<TableHead>{t('start_date')}</TableHead>
									<TableHead>{t('num_of_uses')}</TableHead>
									{permission('status') && <TableHead>{t('status')}</TableHead>}
									{(permission('update') || permission('destroy') || permission('show')) && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
										<TableCell>{item?.name}</TableCell>
										<TableCell>{item?.code}</TableCell>
										<TableCell>{item?.discount}</TableCell>
										<TableCell>{item?.start_date}</TableCell>
										<TableCell>{item?.no_of_uses}</TableCell>
										{permission('status') && (
											<TableCell>
												<CustomSwitch onChange={() => handleOpenStatusModal(item?.id)} defaultChecked={item?.is_active} id={i} labelOff={t('off')} labelOn={t('on')} />
											</TableCell>
										)}
										{(permission('update') || permission('destroy')) && (
											<TableCell>
												<div className="h-full flex gap-2 justify-start items-center">
													{permission('update') && <Icon to={`/marketing-management/coupons/edit/${item?.id}`} icon={<FaEdit className="text-green-500" />} />}
													{permission('destroy') && <Icon onClick={() => handleDeleteModal(item?.id)} icon={<FaTrash className="text-red-600" />} />}
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

export default CouponsContent
