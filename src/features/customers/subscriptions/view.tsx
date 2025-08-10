import { Loading } from '@/components/ui/Loading'
import ListItem from '@/components/ui/list-item'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/custom-table'
import { useAssignDeliveryToSubscription, useShowSingleSubscription } from './hooks'
import CustomSelect from '@/components/ui/custom-select'
import { useGetAllDeliveries } from '../../delivery/delivery-men/hooks'
import { useTranslation } from 'react-i18next'
import { Card, CardBody } from '@/components/ui/card'

const ViewSubscriptionContent = () => {
	const { t } = useTranslation()
	const { showLoading, showResponse } = useShowSingleSubscription()
	const { data: deliveries } = useGetAllDeliveries({ is_paginated: 0, zone_id: showResponse?.data?.zone_id })
	const { handleAssign, handleAssignDeliveryToDay } = useAssignDeliveryToSubscription()

	return (
		<Card>
			{showLoading && <Loading />}
			<CardBody>
				<div className="bg-gray-50 rounded-md">
					<ListItem
						label={t('status')}
						value={
							<CustomSelect
								onChange={(e: any) => handleAssign(e?.id)}
								className="w-[250px]"
								placeholder={t('select_delivery')}
								label={t('delivery_men')}
								options={deliveries?.data?.data}
								isClearable={true}
								optionLabel="localized_name"
								optionValue="id"
							/>
						}
					/>
					<ListItem label={t('subscription_name')} value={showResponse?.data?.localized_subscription_name} />
					<ListItem label={t('customer_name')} value={showResponse?.data?.localized_customer_name} />
					<ListItem label={t('start_date')} value={showResponse?.data?.start_date} />
					<ListItem label={t('end_date')} value={showResponse?.data?.end_date} />
					<ListItem label={t('version_duration')} value={showResponse?.data?.version_duration} />
					<ListItem label={t('price')} value={showResponse?.data?.total_price} />
				</div>
				<div className="mt-8">
					<h3 className="text-2xl font-bold text-gray-800">{t('subscription_orders')}</h3>
					<Table className="md:overflow-visible">
						<TableHeader>
							<TableRow>
								<TableHead>{t('id')}</TableHead>
								<TableHead>{t('delivery_date')}</TableHead>
								<TableHead>{t('order_status')}</TableHead>
								<TableHead>{t('payment_status')}</TableHead>
								<TableHead>{t('payment_method')}</TableHead>
								<TableHead>{t('total_price')}</TableHead>
								<TableHead>{t('assigned_to')}</TableHead>
								<TableHead>{t('actions')}</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{showResponse?.data?.orders?.map((item: any, i: number) => {
								return (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
										<TableCell>{item?.order_id}</TableCell>
										<TableCell>{item?.delivery_date}</TableCell>
										<TableCell>{item?.order_status}</TableCell>
										<TableCell>{item?.payment_status}</TableCell>
										<TableCell>{item?.payment_method}</TableCell>
										<TableCell>{item?.total_price}</TableCell>
										<TableCell>{item?.assigned_to}</TableCell>
										<TableCell>
											<CustomSelect
												onChange={(e: any) => handleAssignDeliveryToDay(e?.id, item?.order_day_id)}
												className="w-[200px]"
												placeholder={t('select_delivery')}
												label={t('delivery_men')}
												options={deliveries?.data?.data}
												isClearable={true}
												optionLabel="localized_name"
												optionValue="id"
											/>
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</div>
			</CardBody>
		</Card>
	)
}

export default ViewSubscriptionContent
