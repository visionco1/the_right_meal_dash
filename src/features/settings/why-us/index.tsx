import { FileUploader, FormInput } from '@/components'
import ConfirmModal from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custom-modal'
import CustomSwitch from '@/components/ui/custom-switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { Loading } from '@/components/ui/Loading'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import ListItem from '@/components/ui/list-item'
import { useUpdateWhyUs, useWhyUsHook } from './hooks'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import CreateSection from './create'
import UpdateSection from './update'

const WhyUsContent = () => {
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
		setOpenStatusModal,
		openShowModal,
		setOpenShowModal,
		singleLoading,
		singleResponse,
		handleOpenShowModal
	} = useWhyUsHook()
	const { updateLoading, handleChange, openEditModal, setOpenEditModal, handleOpenModal, showLoading, showResponse, updateData, handleSubmit } = useUpdateWhyUs()
	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant="light" onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}
				{permission('store') && <CreateSection />}
				{permission('update') && (
					<UpdateSection
						data={updateData}
						showLoading={showLoading}
						updateLoading={updateLoading}
						open={openEditModal}
						setOpenModal={setOpenEditModal}
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						showResponse={showResponse}
					/>
				)}
				{permission('show') && (
					<CustomModal
						titleHead={t('section_details')}
						classNameContent="overflow-visible"
						isOpen={openShowModal}
						setIsOpen={setOpenShowModal}
						open={openShowModal}
						closeOnClickOut
						position="center"
						body={
							<div className="pt-5 w-[80vw] lg:w-[50vw] p-3 min-h-[200px]">
								{singleLoading && <Loading />}
								<div>
									<ListItem label={t('image')} value={<img className="w-28 h-16 rounded-sm" alt="img" src={singleResponse?.data?.image?.url} />} />
									<ListItem label={t('title_en')} value={singleResponse?.data?.title?.en} />
									<ListItem label={t('title_ar')} value={singleResponse?.data?.title?.ar} />
									<ListItem label={t('description_en')} value={singleResponse?.data?.description?.en} />
									<ListItem label={t('description_ar')} value={singleResponse?.data?.description?.ar} />
								</div>
							</div>
						}
					/>
				)}
				{permission('destroy') && (
					<ConfirmModal loading={deleteLoading} handleClick={handleDelete} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} message={t('delete_confirm')} btnValue={t('delete')} />
				)}
				<ConfirmModal
					loading={statusLoading}
					handleClick={handleChangeStatusModal}
					openModal={openStatusModal}
					setOpenModal={setOpenStatusModal}
					message={t('status_confirm')}
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
									<TableHead>ID</TableHead>
									<TableHead>{t('title')}</TableHead>
									{permission('status') && <TableHead>{t('status')}</TableHead>}
									{(permission('update') || permission('destroy') || permission('show')) && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
										<TableCell>{i + 1}</TableCell>
										<TableCell>{item?.localized_title}</TableCell>
										{permission('status') && (
											<TableCell>
												<CustomSwitch onChange={() => handleOpenStatusModal(item?.id)} defaultChecked={item?.is_active} id={i} labelOff={t('off')} labelOn={t('on')} />
											</TableCell>
										)}
										{(permission('update') || permission('destroy') || permission('show')) && (
											<TableCell>
												<div className="h-full flex gap-2 justify-start items-center">
													{permission('show') && <Icon onClick={() => handleOpenShowModal(item?.id)} icon={<FaEye className="text-blue-600" />} />}
													{permission('update') && <Icon onClick={() => handleOpenModal(item?.id)} icon={<FaEdit className="text-green-500" />} />}
													{permission('destroy') && <Icon onClick={() => handleDeleteModal(item?.id)} icon={<FaTrash className="text-red-600" />} />}
												</div>
											</TableCell>
										)}
									</TableRow>
								))}
							</TableBody>
						</Table>
						<TablePagination data={data?.data?.meta} onPageChange={getPage} />
					</>
				)}
			</CardBody>
		</Card>
	)
}

export default WhyUsContent
