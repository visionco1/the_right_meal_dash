import { FileUploader, FormInput } from '@/components'
import ConfirmModal from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import CustomModal from '@/components/ui/custom-modal'
import CustomSwitch from '@/components/ui/custom-switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { Loading } from '@/components/ui/Loading'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { useBannersHook } from './hooks'
import ListItem from '@/components/ui/list-item'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'

const BannersContent = () => {
	const { t } = useTranslation()
	const {
		onDownload,
		tableRef,
		loading,
		data,
		getPage,
		showLoading,
		createLoading,
		openModal,
		setOpenModal,
		updateLoading,
		openEditModal,
		setOpenEditModal,
		handleOpenModal,
		handleDelete,
		updateData,
		openDeleteModal,
		setOpenDeleteModal,
		handleChange,
		handleCreateBanner,
		handleDeleteModal,
		deleteLoading,
		handleUpdateBanner,
		onSearch,
		permission,
		search,
		statusLoading,
		handleChangeStatusModal,
		handleOpenStatusModal,
		createData,
		openStatusModal,
		setOpenStatusModal,
		handleUpdate,
		openShowModal,
		setOpenShowModal,
		singleLoading,
		singleResponse,
		handleOpenShowModal
	} = useBannersHook()

	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant={'light'} onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}
				{permission('store') && (
					<CustomModal
						titleHead={t('add_banner')}
						isOpen={openModal}
						setIsOpen={setOpenModal}
						open={openModal}
						closeOnClickOut={true}
						position="center"
						buttonContent={<Button variant={'primary'}>{t('add_banner')}</Button>}
						body={
							<div className="pt-5 w-[80vw] lg:w-[50vw] p-3">
								{createLoading && <Loading />}
								<form onSubmit={e => handleCreateBanner(e)}>
									<div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-5 mb-8 items-center">
										<FormInput value={createData?.['title:en']} onChange={e => handleChange('title:en', e.target.value)} name="title:en" label={t('title_en')} placeholder={t('enter_title_en')} />
										<FormInput value={createData?.['title:ar']} onChange={e => handleChange('title:ar', e.target.value)} name="title:ar" label={t('title_ar')} placeholder={t('enter_title_ar')} />
										<div className="col-span-1 lg:col-span-2">
											<FormInput value={createData.link} onChange={e => handleChange('link', e.target.value)} name="link" label={t('link_optional')} placeholder={t('enter_link')} />
										</div>
										<div className="col-span-1 lg:col-span-2">
											<FileUploader value={createData?.image} onFileUpload={(e: any) => handleChange('image', e?.[0])} text={t('upload_image')} />
										</div>
										<FormInput
											label={t('date_from')}
											placeholder={t('enter_date_from')}
											onFocus={e => (e.target.type = 'date')}
											onBlur={e => (e.target.type = 'text')}
											type="text"
											value={createData?.date_from}
											onChange={(e: any) => handleChange('date_from', e.target.value)}
										/>
										<FormInput
											label={t('date_to')}
											placeholder={t('enter_date_to')}
											type="text"
											onFocus={e => (e.target.type = 'date')}
											onBlur={e => (e.target.type = 'text')}
											value={createData?.date_to}
											onChange={(e: any) => handleChange('date_to', e.target.value)}
										/>
									</div>
									<div className="my-5 flex gap-3">
										<Button variant={'primary'} type="submit">
											{t('save')}
										</Button>
										<Button variant={'light'} onClick={() => setOpenModal(false)}>
											{t('cancel')}
										</Button>
									</div>
								</form>
							</div>
						}
					/>
				)}
				{permission('update') && (
					<CustomModal
						titleHead={t('edit_banner')}
						isOpen={openEditModal}
						setIsOpen={setOpenEditModal}
						open={openEditModal}
						closeOnClickOut={true}
						position="center"
						body={
							<div className="pt-5 w-[80vw] lg:w-[50vw] p-3 min-h-[400px]">
								{updateLoading || showLoading ? (
									<Loading />
								) : (
									<form onSubmit={e => handleUpdateBanner(e)}>
										<div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-5 mb-8 items-center">
											<FormInput value={updateData?.['title:en']} onChange={e => handleUpdate('title:en', e.target.value)} name="title:en" label={t('title_en')} placeholder={t('enter_title_en')} />
											<FormInput value={updateData?.['title:ar']} onChange={e => handleUpdate('title:ar', e.target.value)} name="title:ar" label={t('title_ar')} placeholder={t('enter_title_ar')} />
											<div className="col-span-1 lg:col-span-2">
												<FormInput value={updateData.link} onChange={e => handleUpdate('link', e.target.value)} name="link" label={t('link_optional')} placeholder={t('enter_link')} />
											</div>
											<div className="col-span-1 lg:col-span-2">
												<FileUploader defaultImage={updateData?.image} onFileUpload={(e: any) => handleUpdate('image', e)} text={t('upload_image')} />
											</div>
											<FormInput
												label={t('date_from')}
												placeholder={t('enter_date_from')}
												onFocus={e => (e.target.type = 'date')}
												onBlur={e => (e.target.type = 'text')}
												type="text"
												value={updateData?.date_from}
												onChange={(e: any) => handleUpdate('date_from', e.target.value)}
											/>
											<FormInput
												label={t('date_to')}
												placeholder={t('enter_date_to')}
												type="text"
												onFocus={e => (e.target.type = 'date')}
												onBlur={e => (e.target.type = 'text')}
												value={updateData?.date_to}
												onChange={(e: any) => handleUpdate('date_to', e.target.value)}
											/>
										</div>
										<div className="my-5 flex gap-3">
											<Button variant={'primary'} type="submit">
												{t('save')}
											</Button>
											<Button variant={'light'} onClick={() => setOpenEditModal(false)}>
												{t('cancel')}
											</Button>
										</div>
									</form>
								)}
							</div>
						}
					/>
				)}
				{permission('show') && (
					<CustomModal
						titleHead={t('banner_details')}
						classNameContent="overflow-visible"
						isOpen={openShowModal}
						setIsOpen={setOpenShowModal}
						open={openShowModal}
						closeOnClickOut={true}
						position="center"
						body={
							<div className="pt-5 w-[80vw] lg:w-[50vw] p-3 min-h-[200px]">
								{singleLoading && <Loading />}
								<div>
									<ListItem label={t('image')} value={<img className="w-28 h-16 rounded-sm" alt="img" src={singleResponse?.data?.image?.url} />} />
									<ListItem label={t('title_en')} value={singleResponse?.data?.title?.en} />
									<ListItem label={t('title_ar')} value={singleResponse?.data?.title?.ar} />
									<ListItem label={t('link')} value={singleResponse?.data?.link} />
									<ListItem label={t('date_from')} value={singleResponse?.data?.date_from} />
									<ListItem label={t('date_to')} value={singleResponse?.data?.date_to} />
								</div>
							</div>
						}
					/>
				)}
				{permission('destroy') && (
					<ConfirmModal loading={deleteLoading} handleClick={handleDelete} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} message={t('confirm_delete_banner')} btnValue={t('delete')} />
				)}
				<ConfirmModal
					loading={statusLoading}
					handleClick={handleChangeStatusModal}
					openModal={openStatusModal}
					setOpenModal={setOpenStatusModal}
					message={t('confirm_status_change')}
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
									<TableHead>{t('title')}</TableHead>
									<TableHead>{t('date_from')}</TableHead>
									<TableHead>{t('date_to')}</TableHead>
									{permission('status') && <TableHead>{t('status')}</TableHead>}
									{(permission('update') || permission('destroy') || permission('show')) && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
										<TableCell>{item?.localized_title}</TableCell>
										<TableCell>{item?.date_from}</TableCell>
										<TableCell>{item?.date_to}</TableCell>
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

export default BannersContent
