import { useShowSingleMeal } from './hooks'
import { Loading } from '@/components/ui/Loading'
import ListItem from '@/components/ui/list-item'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/custom-table'
import { useTranslation } from 'react-i18next'
import { Card, CardBody } from '@/components/ui/card'

const ViewMealContent = () => {
	const { t } = useTranslation()
	const { showLoading, showResponse } = useShowSingleMeal()

	return (
		<Card>
			<CardBody>
				{showLoading && <Loading />}
				<div className="bg-gray-50 rounded-md">
					{/* <ListItem label={t('image')} value={<img className="h-16 w-16 rounded-full" src={showResponse?.data?.image?.url} alt="img" />} /> */}
					<ListItem label={t('name')} value={showResponse?.data?.localized_name} />
					<ListItem label={t('allergens')} value={showResponse?.data?.allergens?.map((item: any) => item?.localized_name)?.join(', ')} />
					<ListItem
						label={t('calories')}
						value={showResponse?.data?.calories?.map((item: any) => (
							<span key={item?.calories} className="bg-primary py-1 px-2 mx-1 text-white rounded-full text-xs">
								{item?.calories}
							</span>
						))}
					/>
					<ListItem label={t('categories')} value={showResponse?.data?.category?.localized_name} />
					<ListItem label={t('country')} value={showResponse?.data?.country?.localized_name} />
				</div>
				<div className="mt-8">
					<h3 className="text-2xl font-bold text-gray-800">{t('nutrition_facts')}</h3>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>{t('id')}</TableHead>
								<TableHead>{t('meal_name')}</TableHead>
								<TableHead>{t('meal_category')}</TableHead>
								<TableHead>{t('calories')}</TableHead>
								<TableHead>{t('carbohydrates')}</TableHead>
								<TableHead>{t('fats')}</TableHead>
								<TableHead>{t('protein')}</TableHead>
								<TableHead>{t('size')}</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{showResponse?.data?.nutritions?.map((item: any, i: number) => (
								<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
									<TableCell>{item?.id}</TableCell>
									<TableCell>{item?.localized_meal}</TableCell>
									<TableCell>{item?.localized_meal_category}</TableCell>
									<TableCell>{item?.calories}</TableCell>
									<TableCell>{item?.carbohydrates}</TableCell>
									<TableCell>{item?.fats}</TableCell>
									<TableCell>{item?.protiens}</TableCell>
									<TableCell>{item?.size?.localized_name}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardBody>
		</Card>
	)
}

export default ViewMealContent
