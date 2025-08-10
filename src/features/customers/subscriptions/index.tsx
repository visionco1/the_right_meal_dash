import { Button } from '@/components/ui/button'
import CustomSelect from '@/components/ui/custom-select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow } from '@/components/ui/custom-table'
import { Loading } from '@/components/ui/Loading'
import Icon from '@/components/ui/icon'
import { FaEye } from 'react-icons/fa'
import { useGetSubscriptions, useSubscriptionHook } from './hooks'
import FormInput from '@/components/ui/form-input'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import { setSelect } from '@/helpers/helpers'

const SubscriptionsContent = () => {
	const { t } = useTranslation()
	const { handleChangeFilter, filter_data, loading, data, getPage, onSearch, handleSearch } = useGetSubscriptions()
	const { tableRef, onDownload, permission } = useSubscriptionHook()
	const status = [
		{ id: 'pending', name: 'Active' },
		{ id: 'paid', name: 'Deactive' }
	]

	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant={'light'} onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}
			</CardHeader>

			<CardBody>
				<h3 className="text-lg font-bold">{t('subscriptions_filter')}</h3>
				<div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-10">
					<FormInput label={t('customer')} placeholder={t('customer')} onChange={e => onSearch(e?.target?.value)} />
					<FormInput label={t('version duration')} placeholder={t('version duration')} onChange={(e: any) => handleChangeFilter('version_duration', e.target.value)} />
					<FormInput
						label={t('start_date')}
						onFocus={e => (e.target.type = 'date')}
						onBlur={e => (e.target.type = 'text')}
						type="text"
						value={filter_data?.start_date}
						placeholder={t('start_date')}
						onChange={(e: any) => handleChangeFilter('start_date', e.target.value)}
					/>
					<FormInput
						label={t('end_date')}
						onFocus={e => (e.target.type = 'date')}
						onBlur={e => (e.target.type = 'text')}
						type="text"
						value={filter_data?.end_date}
						placeholder={t('end_date')}
						onChange={(e: any) => handleChangeFilter('end_date', e.target.value)}
					/>
					<CustomSelect
						label={t('subscription')}
						onChange={(e: any) => handleChangeFilter('subscription', e?.localized_subscription_name)}
						placeholder={t('select_subscription')}
						options={data?.data?.data}
						value={setSelect(data?.data?.data, filter_data?.subscription, 'localized_subscription_name')}
						isClearable={true}
						optionLabel={'localized_subscription_name'}
						optionValue={'id'}
					/>

					<CustomSelect
						label={t('status')}
						onChange={(e: any) => handleChangeFilter('status', e?.id)}
						placeholder={t('select_status')}
						options={status}
						value={setSelect(status, filter_data?.status)}
						isClearable={true}
						optionLabel={'name'}
						optionValue={'id'}
					/>

					<div className="col-span-3 flex items-end">
						<Button className="w-fit" variant={'primary'} onClick={() => handleSearch()}>
							{t('search')}
						</Button>
					</div>
				</div>

				{loading && <Loading />}

				{permission('index') && (
					<>
						<Table ref={tableRef}>
							<TableHeader>
								<TableRow>
									<TableHead>{t('customer_name')}</TableHead>
									<TableHead>{t('subscription_name')}</TableHead>
									<TableHead>{t('version')}</TableHead>
									<TableHead>{t('status')}</TableHead>
									<TableHead>{t('start_date')}</TableHead>
									<TableHead>{t('original_end_date')}</TableHead>
									<TableHead>{t('extended_end_date')}</TableHead>
									{(permission('update') || permission('destroy') || permission('show')) && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
										<TableCell className="text-primary">
											<Link to={`/customers-management/customers/${item?.customer_id}`}>{item?.localized_customer_name}</Link>
										</TableCell>
										<TableCell>{item?.localized_subscription_name}</TableCell>
										<TableCell>{item?.version_duration}</TableCell>
										<TableCell>{item?.status}</TableCell>
										<TableCell>{item?.start_date}</TableCell>
										<TableCell>{item?.end_date}</TableCell>
										<TableCell>{item?.extended_end_date}</TableCell>
										{(permission('update') || permission('destroy') || permission('show')) && (
											<TableCell>
												<div className="h-full flex gap-2 justify-start items-center">
													{permission('show') && <Icon to={`/customers-management/subscriptions/view/${item?.id}`} icon={<FaEye className="text-blue-600" />} className="text-md" />}
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

export default SubscriptionsContent
