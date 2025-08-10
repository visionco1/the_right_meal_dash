import ConfirmModal from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { Loading } from '@/components/ui/Loading'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useComplaintsHook, useUpdateComplaint } from './hooks'
import { dateHelper } from '@/helpers/helpers'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import CreateComplaint from './create'
import UpdateComplaint from './update'

const ComplaintsContent = () => {
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
		handleChangeFilter,
		handleSearch,
		filter_data,
		search
	} = useComplaintsHook()

	// const { active_data: countries } = useGetAllCountries({ is_paginated: 0 })
	// const { active_data: cities } = useGetCities({ is_paginated: 0 })
	// const { active_data: branches } = useGetBranches({ is_paginated: 0 })

	// const months_list = [
	// 	{ id: 'jan', localized_name: t('January') },
	// 	{ id: 'feb', localized_name: t('February') },
	// 	{ id: 'mar', localized_name: t('March') },
	// 	{ id: 'apr', localized_name: t('April') },
	// 	{ id: 'may', localized_name: t('May') },
	// 	{ id: 'jun', localized_name: t('June') },
	// 	{ id: 'jul', localized_name: t('July') },
	// 	{ id: 'aug', localized_name: t('August') },
	// 	{ id: 'sep', localized_name: t('September') },
	// 	{ id: 'oct', localized_name: t('October') },
	// 	{ id: 'nov', localized_name: t('November') },
	// 	{ id: 'dec', localized_name: t('December') }
	// ]

	const { loading: showLoading, updateLoading, handleChange, openEditModal, setOpenEditModal, handleSubmit, data: updateData, handleOpenModal, showResponse } = useUpdateComplaint()
	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant="light" onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}
				{permission('store') && <CreateComplaint />}
				{permission('update') && (
					<UpdateComplaint
						loading={showLoading}
						updateLoading={updateLoading}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						data={updateData}
						openModal={openEditModal}
						setOpenModal={setOpenEditModal}
						showResponse={showResponse}
					/>
				)}
				{permission('destroy') && (
					<ConfirmModal
						loading={deleteLoading}
						handleClick={handleDelete}
						openModal={openDeleteModal}
						setOpenModal={setOpenDeleteModal}
						message={t('delete_complaint_confirm')}
						btnValue={t('delete')}
					/>
				)}
			</CardHeader>

			<CardBody>
				{/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-10">
				<FormInput label={t('search')} placeholder={t('search')} onChange={e => onSearch(e?.target?.value)} />
					<CustomSelect
						label={t('country')}
						value={filter_data?.country}
						onChange={(e: any) => handleChangeFilter('country', e)}
						placeholder={t('select_country')}
						options={countries}
						isClearable
						optionLabel="localized_name"
						optionValue="id"
					/>
					<CustomSelect
						label={t('city')}
						value={filter_data?.city}
						onChange={(e: any) => handleChangeFilter('city', e)}
						placeholder={t('select_city')}
						options={cities}
						isClearable
						optionLabel="localized_name"
						optionValue="id"
					/>
					<CustomSelect
						label={t('branch')}
						value={filter_data?.branch}
						onChange={(e: any) => handleChangeFilter('branch', e)}
						placeholder={t('select_branch')}
						options={branches}
						isClearable
						optionLabel="localized_name"
						optionValue="id"
					/>
					<FormInput
						label={t('start_date')}
						type="text"
						onFocus={e => (e.target.type = 'date')}
						onBlur={e => (e.target.type = 'text')}
						value={filter_data?.start_date}
						placeholder={t('start_date')}
						onChange={(e: any) => handleChangeFilter('start_date', e.target.value)}
					/>
					<FormInput
						label={t('end_date')}
						type="text"
						onFocus={e => (e.target.type = 'date')}
						onBlur={e => (e.target.type = 'text')}
						value={filter_data?.end_date}
						placeholder={t('end_date')}
						onChange={(e: any) => handleChangeFilter('end_date', e.target.value)}
					/>
					<CustomSelect
						label={t('month')}
						value={filter_data?.month}
						onChange={(e: any) => handleChangeFilter('month', e)}
						placeholder={t('select_month')}
						options={months_list}
						isClearable
						optionLabel="localized_name"
						optionValue="id"
					/>
					<div className="col-span-3 flex items-end">
						<Button className="w-fit" variant="primary" onClick={handleSearch}>
							{t('search')}
						</Button>
					</div>
				</div> */}
				{loading && <Loading />}
				{permission('index') && (
					<>
						<TableSearch search={search} onSearch={onSearch} />
						<Table ref={tableRef}>
							<TableHeader>
								<TableRow>
									<TableHead>{t('customer_name')}</TableHead>
									<TableHead>{t('complaint message')}</TableHead>
									<TableHead>{t('country')}</TableHead>
									<TableHead>{t('city')}</TableHead>
									<TableHead>{t('branch')}</TableHead>
									<TableHead>{t('creation_date')}</TableHead>
									<TableHead>{t('created_by')}</TableHead>
									{(permission('update') || permission('destroy')) && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}>
										<TableCell>{item?.user?.name}</TableCell>
										<TableCell>{item?.message}</TableCell>
										<TableCell>{item?.country}</TableCell>
										<TableCell>{item?.city}</TableCell>
										<TableCell>{item?.branch}</TableCell>
										<TableCell>{dateHelper.formatISODate(item?.created_at)}</TableCell>
										<TableCell>{item?.created_by}</TableCell>
										{(permission('update') || permission('destroy')) && (
											<TableCell>
												<div className="flex gap-2 items-center">
													{permission('update') && <Icon icon={<FaEdit className="text-green-500" />} onClick={() => handleOpenModal(item?.id)} />}
													{permission('destroy') && <Icon icon={<FaTrash className="text-red-600" />} onClick={() => handleDeleteModal(item?.id)} />}
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

export default ComplaintsContent
