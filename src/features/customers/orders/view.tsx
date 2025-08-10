import { Loading } from '@/components/ui/Loading'
import ListItem from '@/components/ui/list-item'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/custom-table'
import CustomSelect from '@/components/ui/custom-select'
import { useGetAllDeliveries } from '../../delivery/delivery-men/hooks'
import { useAssignDeliveryToOrder, useShowOrder } from './hooks'
import { useTranslation } from 'react-i18next'
import { Card, CardBody } from '@/components/ui/card'

const ViewOrderContent = () => {
	const { t } = useTranslation()
	const { showLoading, showResponse } = useShowOrder()
	const { data: deliveries } = useGetAllDeliveries({ is_paginated: 0, zone_id: showResponse?.data?.zone_id })
	const { handleAssignStatus, handleAssignDelivery } = useAssignDeliveryToOrder()

	const status_options = [
		{ id: 'Preparing', label: t('Preparing') },
		{ id: 'on_the_road', label: t('on_the_road') },
		{ id: 'Delivered', label: t('Delivered') }
	]

	return (
		<Card>
			{showLoading && <Loading />}
			<CardBody>
				<div className="bg-gray-50 rounded-md">
					<ListItem label={t('order_type')} value={showResponse?.data?.order_type} />

					<ListItem
						label={t('order_status')}
						value={
							<CustomSelect
								onChange={(e: any) => handleAssignStatus(e?.id)}
								className="w-[250px]"
								placeholder={t('select_status')}
								label={t('order_status')}
								options={status_options}
								isClearable
								optionLabel="label"
								optionValue="id"
							/>
						}
					/>

					<ListItem
						label={t('delivery_man')}
						value={
							<CustomSelect
								onChange={(e: any) => handleAssignDelivery(e?.id)}
								className="w-[250px]"
								placeholder={t('select_delivery')}
								label={t('delivery_man')}
								options={deliveries?.data?.data}
								isClearable
								optionLabel="localized_name"
								optionValue="id"
							/>
						}
					/>

					<ListItem label={t('payment_method')} value={showResponse?.data?.payment_method} />
					<ListItem label={t('payment_status')} value={showResponse?.data?.payment_status} />
					<ListItem label={t('title_name')} value={showResponse?.data?.localized_sub_name} />
					<ListItem label={t('phone')} value={showResponse?.data?.phone} />
					<ListItem label={t('total price')} value={showResponse?.data?.total_price} />
					<ListItem label={t('address')} value={showResponse?.data?.address?.address} />
				</div>

				<div className="mt-8">
					<h3 className="text-2xl font-bold text-gray-800">{t('meals')}</h3>
					<Table className="md:overflow-visible">
						<TableHeader>
							<TableRow>
								<TableHead>{t('name')}</TableHead>
								<TableHead>{t('meal_category')}</TableHead>
								<TableHead>{t('discount')}</TableHead>
								<TableHead>{t('price_after_discount')}</TableHead>
								<TableHead>{t('size')}</TableHead>
								<TableHead>{t('calories')}</TableHead>
								<TableHead>{t('carbohydrates')}</TableHead>
								<TableHead>{t('proteins')}</TableHead>
								<TableHead>{t('fats')}</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{showResponse?.data?.meals?.map((item: any, i: number) => (
								<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
									<TableCell>{item?.localized_meal_name}</TableCell>
									<TableCell>{item?.meal_category}</TableCell>
									<TableCell>{item?.discount}</TableCell>
									<TableCell>{item?.price_after_discount}</TableCell>
									<TableCell>{item?.localized_meal_size}</TableCell>
									<TableCell>{item?.calories}</TableCell>
									<TableCell>{item?.carbohydrates}</TableCell>
									<TableCell>{item?.protiens}</TableCell>
									<TableCell>{item?.fats}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardBody>
		</Card>
	)
}

export default ViewOrderContent
