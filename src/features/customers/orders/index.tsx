import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { Loading } from '@/components/ui/Loading'
import { FaEye } from 'react-icons/fa'
import { dateHelper, setSelect } from '@/helpers/helpers'
import { useOrdersHook } from './hooks'
import { Link } from 'react-router-dom'
import CustomSelect from '@/components/ui/custom-select'
import { useGetAllCountries } from '@/features/settings/countries/hooks'
import { useGetAllZones } from '@/features/delivery/zones/hooks'
import { useGetAllDeliveries } from '@/features/delivery/delivery-men/hooks'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'

const OrdersContent = () => {
	const { t } = useTranslation()
	const { onDownload, tableRef, loading, data, getPage, permission, handleChangeFilter, handleSearch, filter_data } = useOrdersHook()

	const { active_data: countries } = useGetAllCountries({ is_paginated: 0 })
	const { active_data: zones } = useGetAllZones({ is_paginated: 0 })
	const { data: deliveries } = useGetAllDeliveries({ is_paginated: 0 })

	const order_status_list = [
		{ id: 'preparing', name: t('preparing') },
		{ id: 'on_the_road', name: t('on the road') },
		{ id: 'delivered', name: t('delivered') },
		{ id: 'Cancelled_Quality', name: t('cancelled quality') },
		{ id: 'Cancelled_Delivery', name: t('cancelled delivery') }
	]

	const order_types_list = [
		{ id: 'subscription', localized_name: t('subscription') },
		{ id: 'outlet', localized_name: t('outlet') }
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
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-10">
					<CustomSelect
						label={t('order_type')}
						onChange={(e: any) => handleChangeFilter('order_type', e?.id)}
						placeholder={t('order_type')}
						options={order_types_list}
						value={setSelect(order_types_list, filter_data?.order_type)}
						isClearable
						optionLabel="localized_name"
						optionValue="id"
					/>
					<CustomSelect
						label={t('order_status')}
						onChange={(e: any) => handleChangeFilter('order_status', e?.id)}
						placeholder={t('order_status')}
						options={order_status_list}
						value={setSelect(order_status_list, filter_data?.order_status)}
						isClearable
						optionLabel="name"
						optionValue="id"
					/>
					<CustomSelect
						label={t('country')}
						onChange={(e: any) => handleChangeFilter('country', e?.id)}
						placeholder={t('select_country')}
						options={countries}
						value={setSelect(countries, filter_data?.country)}
						isClearable
						optionLabel="localized_name"
						optionValue="id"
					/>
					<CustomSelect
						label={t('zone')}
						onChange={(e: any) => handleChangeFilter('zone', e?.id)}
						placeholder={t('select_zone')}
						options={zones}
						value={setSelect(zones, filter_data?.zone)}
						isClearable
						optionLabel="localized_name"
						optionValue="id"
					/>
					<CustomSelect
						label={t('captin')}
						onChange={(e: any) => handleChangeFilter('captin', e?.id)}
						placeholder={t('select_captin')}
						options={deliveries?.data?.data}
						value={setSelect(deliveries?.data?.data, filter_data?.captin)}
						isClearable
						optionLabel="localized_name"
						optionValue="id"
					/>
					<div className="col-span-3 flex items-end">
						<Button className="w-fit" variant="primary" onClick={handleSearch}>
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
									<TableHead>{t('order_type')}</TableHead>
									<TableHead>{t('subscription')}</TableHead>
									<TableHead>{t('order_date')}</TableHead>
									<TableHead>{t('status')}</TableHead>
									<TableHead>{t('payment_status')}</TableHead>
									<TableHead>{t('total_price')}</TableHead>
									<TableHead>{t('country')}</TableHead>
									<TableHead>{t('zone')}</TableHead>
									<TableHead>{t('assign_to')}</TableHead>
									{permission('show') && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
										<TableCell>{item?.localized_customer_name}</TableCell>
										<TableCell>{item?.order_type}</TableCell>
										<TableCell>
											{item?.subscription_id ? (
												<Link className="text-primary" to={`/customers-management/subscriptions/${item?.subscription_id}`}>
													{item?.localized_sub_name}
												</Link>
											) : (
												item?.localized_sub_name
											)}
										</TableCell>
										<TableCell>{dateHelper.formatISODate(item?.date_of_day)}</TableCell>
										<TableCell>{item?.status}</TableCell>
										<TableCell>{item?.payment_status}</TableCell>
										<TableCell>{item?.total_price}</TableCell>
										<TableCell>{item?.localized_country}</TableCell>
										<TableCell>{item?.localized_zone}</TableCell>
										<TableCell>{item?.captin}</TableCell>
										{permission('show') && (
											<TableCell>
												<Icon to={`/customers-management/orders/view/${item?.id}`} icon={<FaEye className="text-blue-600" />} />
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

export default OrdersContent
