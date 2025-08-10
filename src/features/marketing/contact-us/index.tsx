import ConfirmModal from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { Loading } from '@/components/ui/Loading'
import { FaTrash } from 'react-icons/fa'
import { useContactUsHook } from './hooks'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'

const ContactUsContent = () => {
	const { t } = useTranslation()
	const { onDownload, tableRef, loading, data, getPage, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal, deleteLoading, onSearch, permission, search } = useContactUsHook()

	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant={'light'} onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}
				{permission('destroy') && (
					<ConfirmModal loading={deleteLoading} handleClick={handleDelete} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} message={t('confirm_delete_message')} btnValue={t('delete')} />
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
									<TableHead>{t('sender_name')}</TableHead>
									<TableHead>{t('email')}</TableHead>
									<TableHead>{t('phone')}</TableHead>
									<TableHead>{t('message_content')}</TableHead>
									{(permission('update') || permission('destroy') || permission('show')) && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
										<TableCell>{item?.name}</TableCell>
										<TableCell>{item?.email}</TableCell>
										<TableCell>{item?.phone}</TableCell>
										<TableCell>{item?.message}</TableCell>
										{(permission('destroy') || permission('show')) && (
											<TableCell>
												<div className="h-full flex gap-2 justify-start items-center">
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

export default ContactUsContent
