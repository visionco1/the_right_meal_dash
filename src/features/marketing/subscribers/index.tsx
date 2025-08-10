import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import { Loading } from '@/components/ui/Loading'
import { useSubscribersHook } from './hooks'
import Icon from '@/components/ui/icon'
import { FaTrash } from 'react-icons/fa'
import ConfirmModal from '@/components/modals/confirm-modal'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'

const SubscribersContent = () => {
	const { t } = useTranslation()
	const { onDownload, tableRef, loading, data, getPage, onSearch, permission, search, handleDeleteModal, deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal } = useSubscribersHook()

	return (
		<Card>
			<CardHeader>
				{permission('show') && <Button onClick={onDownload}>{t('export_excel')}</Button>}
				{permission('destroy') && (
					<ConfirmModal
						loading={deleteLoading}
						handleClick={handleDelete}
						openModal={openDeleteModal}
						setOpenModal={setOpenDeleteModal}
						message={t('confirm_delete_subscriber')}
						btnValue={t('delete')}
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
									<TableHead>{t('email')}</TableHead>
									{permission('destroy') && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
										<TableCell>{item?.email}</TableCell>
										{permission('destroy') && (
											<TableCell>
												<Icon onClick={() => handleDeleteModal(item?.id)} icon={<FaTrash className="text-red-600" />} />
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

export default SubscribersContent
