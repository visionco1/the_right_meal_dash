import { Button } from '@/components/ui/button'
import { Loading } from '@/components/ui/Loading'
import { useCountriesHook, useGetAllCountries, useUpdateCountry } from './hooks'
import CustomSwitch from '@/components/ui/custom-switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { FaEdit, FaPaperclip, FaTrash } from 'react-icons/fa'
import ConfirmModal from '@/components/modals/confirm-modal'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import CreateCountry from './create'
import UpdateCountry from './update'

const Content = () => {
	const { t } = useTranslation()
	const { loading, data, getPage, onSearch, search, permission } = useGetAllCountries()
	const {
		tableRef,
		onDownload,
		handleDelete,
		handleDeleteModal,
		openDeleteModal,
		setOpenDeleteModal,
		deleteLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		openStatusModal,
		setOpenStatusModal,
		statusLoading
	} = useCountriesHook()
	const { updateLoading, openEditModal, values, setOpenEditModal, handleOpenModal, showLoading, showResponse, handleSubmit, handleChange } = useUpdateCountry()
	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant={'light'} onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}
				{permission('store') && <CreateCountry />}
				{permission('update') && (
					<UpdateCountry
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
					<ConfirmModal loading={deleteLoading} handleClick={handleDelete} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} message={t('confirm_delete_country')} btnValue={t('delete')} />
				)}
				<ConfirmModal
					loading={statusLoading}
					handleClick={handleChangeStatusModal}
					openModal={openStatusModal}
					setOpenModal={setOpenStatusModal}
					message={t('confirm_change_status')}
					btnValue={t('change')}
				/>
			</CardHeader>
			<CardBody>
				{loading && <Loading />}
				{permission('show') && (
					<>
						<TableSearch search={search} onSearch={onSearch} />
						<Table ref={tableRef}>
							<TableHeader>
								<TableRow>
									<TableHead>{t('image')}</TableHead>
									<TableHead>{t('name')}</TableHead>
									<TableHead>{t('country_code')}</TableHead>
									<TableHead>{t('currency')}</TableHead>
									<TableHead>{t('dial_code')}</TableHead>
									{permission('status') && <TableHead>{t('status')}</TableHead>}
									{(permission('destroy') || permission('update') || permission('show')) && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
										<TableCell>
											<img src={item?.image?.url} alt="country-img" className="w-16 h-16 rounded flex-1" />
										</TableCell>
										<TableCell>{item?.localized_name}</TableCell>
										<TableCell>{item?.country_code}</TableCell>
										<TableCell>{item?.currency?.['en']}</TableCell>
										<TableCell>{item?.dial_code}</TableCell>
										{permission('status') && (
											<TableCell>
												<CustomSwitch onChange={() => handleOpenStatusModal(item?.id)} defaultChecked={item?.is_active} id={i} labelOff={t('off')} labelOn={t('on')} />
											</TableCell>
										)}
										{(permission('destroy') || permission('update') || permission('show')) && (
											<TableCell>
												<div className="h-full flex gap-2 justify-start items-center">
													{permission('update') && <Icon onClick={() => handleOpenModal(item?.id)} icon={<FaEdit className="text-green-500" />} />}
													{permission('destroy') && <Icon onClick={() => handleDeleteModal(item?.id)} icon={<FaTrash className="text-red-600" />} />}
													{permission('show') && <Icon to={`/settings/countries/${item?.id}`} icon={<FaPaperclip className="text-blue-600" />} />}
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
