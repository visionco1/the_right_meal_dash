import { Button } from '@/components/ui/button'
import CustomSwitch from '@/components/ui/custom-switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { Loading } from '@/components/ui/Loading'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { useZoneHook } from './hooks'
import ConfirmModal from '@/components/modals/confirm-modal'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'

const Content = () => {
	const { t } = useTranslation()
	const {
		loading,
		data,
		getPage,
		handleDelete,
		onSearch,
		search,
		onDownload,
		handleDeleteModal,
		permission,
		deleteLoading,
		openDeleteModal,
		setOpenDeleteModal,
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal
	} = useZoneHook()

	return (
		<Card>
			<CardHeader>
				<Button variant="light" onClick={onDownload}>
					{t('export_excel')}
				</Button>
				<Button href="/delivery-management/zones/add">{t('add_zone')}</Button>
				{permission('destroy') && (
					<ConfirmModal
						loading={deleteLoading}
						handleClick={handleDelete}
						openModal={openDeleteModal}
						setOpenModal={setOpenDeleteModal}
						message={t('are_you_sure_delete_zone')}
						btnValue={t('delete')}
					/>
				)}
				<ConfirmModal
					loading={statusLoading}
					handleClick={handleChangeStatusModal}
					openModal={openStatusModal}
					setOpenModal={setOpenStatusModal}
					message={t('are_you_sure_change_status')}
					btnValue={t('change')}
				/>
			</CardHeader>
			<CardBody>
				{loading && <Loading />}
				<TableSearch search={search} onSearch={onSearch} />
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>{t('name')}</TableHead>
							<TableHead>{t('country')}</TableHead>
							<TableHead>{t('branch')}</TableHead>
							<TableHead>{t('status')}</TableHead>
							<TableHead>{t('actions')}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.data?.data?.map((item: any, i: number) => (
							<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
								<TableCell>{item?.localized_name}</TableCell>
								<TableCell>{item?.country?.localized_name}</TableCell>
								<TableCell>{item?.branch?.localized_name}</TableCell>
								<TableCell>
									<CustomSwitch onChange={() => handleOpenStatusModal(item?.id)} defaultChecked={item?.is_active} id={i} labelOff={t('off')} labelOn={t('on')} />
								</TableCell>
								<TableCell>
									<div className="h-full flex gap-2 justify-start items-center">
										<Icon to={`/delivery-management/zones/edit/${item?.id}`} icon={<FaEdit className="text-green-500" />} />
										{permission('show') && <Icon to={`/delivery-management/zones/${item?.id}`} icon={<FaEye className="text-blue-600" />} className="text-md" />}
										<Icon onClick={() => handleDeleteModal(item?.id)} icon={<FaTrash className="text-red-600" />} />
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<TablePagination data={data?.data?.meta} onPageChange={page => getPage(page)} />
			</CardBody>
		</Card>
	)
}

export default Content
