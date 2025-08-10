import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import { Loading } from '@/components/ui/Loading'
import { useNotificationsHook } from './hooks'
import ConfirmModal from '@/components/modals/confirm-modal'
import Icon from '@/components/ui/icon'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import CustomModal from '@/components/ui/custom-modal'
import ListItem from '@/components/ui/list-item'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'

const NotificationsContent = () => {
	const { t } = useTranslation()
	const {
		onDownload,
		tableRef,
		loading,
		data,
		getPage,
		onSearch,
		permission,
		search,
		deleteLoading,
		handleDelete,
		openDeleteModal,
		setOpenDeleteModal,
		handleDeleteModal,
		showLoading,
		showResponse,
		setOpenShowModal,
		openShowModal,
		handleOpenShowModal
	} = useNotificationsHook()
	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant={'light'} onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}
				{permission('store') && <Button href="/marketing-management/notifications/add">{t('add_notification')}</Button>}
				{permission('destroy') && (
					<ConfirmModal
						loading={deleteLoading}
						handleClick={handleDelete}
						openModal={openDeleteModal}
						setOpenModal={setOpenDeleteModal}
						message={t('delete_notification_confirm')}
						btnValue={t('delete')}
					/>
				)}
				{permission('show') && (
					<CustomModal
						titleHead={t('notification_details')}
						classNameContent="overflow-visible"
						isOpen={openShowModal}
						setIsOpen={setOpenShowModal}
						open={openShowModal}
						closeOnClickOut={true}
						position="center"
						body={
							<div className="pt-5 w-[80vw] lg:w-[40vw] p-3 min-h-[200px]">
								{showLoading && <Loading />}
								<div>
									<ListItem label={t('title')} value={showResponse?.data?.title} />
									<ListItem label={t('message')} value={showResponse?.data?.email ? showResponse?.data?.email_content : showResponse?.data?.notification_content} />
								</div>
							</div>
						}
					/>
				)}
			</CardHeader>
			<CardBody>
				{loading && <Loading />}
				{permission('index') && (
					<>
						<TableSearch search={search} onSearch={onSearch} />
						<Table ref={tableRef}>
							<TableHeader>
								<TableRow>
									<TableHead>{t('title')}</TableHead>
									<TableHead>{t('actions')}</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
										<TableCell>{item?.title?.en || item?.title}</TableCell>
										{(permission('update') || permission('destroy')) && (
											<TableCell>
												<div className="h-full flex gap-2 justify-start items-center">
													{permission('show') && <Icon onClick={() => handleOpenShowModal(item?.id)} icon={<FaEye className="text-blue-600" />} />}
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

export default NotificationsContent
