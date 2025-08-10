import { useShowSingleSubscriptionPlan } from './hooks'
import { Loading } from '@/components/ui/Loading'
import ListItem from '@/components/ui/list-item'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/custom-table'
import { useTranslation } from 'react-i18next'
import { Card, CardBody } from '@/components/ui/card'

const ViewPlanContent = () => {
	const { t } = useTranslation()
	const { showLoading, showResponse } = useShowSingleSubscriptionPlan()
	return (
		<Card>
			<CardBody>
				{showLoading ? (
					<Loading />
				) : (
					<>
						<div className="bg-gray-50 rounded-md">
							<ListItem label={t('name')} value={showResponse?.data?.localized_name} />
							<ListItem label={t('min_calories')} value={showResponse?.data?.min_calories} />
							<ListItem label={t('max_calories')} value={showResponse?.data?.max_calories} />
							<ListItem label={t('category')} value={showResponse?.data?.localized_category_name} />
							<ListItem label={t('country')} value={showResponse?.data?.country?.localized_name} />
							<ListItem label={t('filter_by_meal_number')} value={showResponse?.data?.filter_by_meal_no} />
						</div>

						<div className="mt-8">
							<h3 className="text-2xl font-bold text-gray-800">{t('versions')}</h3>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>{t('number_of_days')}</TableHead>
										<TableHead>{t('meal_price_per_day')}</TableHead>
										<TableHead>{t('delivery_price_per_day')}</TableHead>
										<TableHead>{t('discount')}</TableHead>
										<TableHead>{t('price')}</TableHead>
										<TableHead>{t('subscription_type')}</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{showResponse?.data?.Versions?.map((item: any, i: number) => (
										<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
											<TableCell>{item?.number_of_days}</TableCell>
											<TableCell>{item?.meal_price_per_day}</TableCell>
											<TableCell>{item?.delivery_price_per_day}</TableCell>
											<TableCell>{item?.discount}</TableCell>
											<TableCell>{item?.price}</TableCell>
											<TableCell>{item?.subscription_type}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>

						<div className="mt-8">
							<h3 className="text-2xl font-bold text-gray-800 capitalize">{t('plan_menus')}</h3>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>{t('menu')}</TableHead>
										<TableHead>{t('section')}</TableHead>
										<TableHead>{t('size')}</TableHead>
										<TableHead>{t('quantity')}</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{showResponse?.data?.plan_menus
										?.filter((item: any) => !item?.multi_selected)
										?.map((item: any, i: number) => (
											<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
												<TableCell>{item?.menu?.localized_name}</TableCell>
												<TableCell>{item?.section?.localized_name}</TableCell>
												<TableCell>{item?.size?.localized_name}</TableCell>
												<TableCell>{item?.quantity}</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</div>

						<div className="mt-8">
							<h3 className="text-2xl font-bold text-gray-800 capitalize">{t('multi_sections')}</h3>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>{t('menu')}</TableHead>
										<TableHead>{t('section')}</TableHead>
										<TableHead>{t('size')}</TableHead>
										<TableHead>{t('quantity')}</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{showResponse?.data?.plan_menus
										?.filter((item: any) => item?.multi_selected)
										?.map((item: any, i: number) => (
											<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
												<TableCell>{item?.menu?.localized_name}</TableCell>
												<TableCell>{item?.section?.localized_name}</TableCell>
												<TableCell>{item?.size?.localized_name}</TableCell>
												<TableCell>{item?.selected_quantity}</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</div>
					</>
				)}
			</CardBody>
		</Card>
	)
}

export default ViewPlanContent
