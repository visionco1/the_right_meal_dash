import ListItem from '@/components/ui/list-item'
import { Loading } from '@/components/ui/Loading'
import { useShowCustomerHealth } from './hooks'
import { useTranslation } from 'react-i18next'
import { Card, CardBody } from '@/components/ui/card'

const ViewContent = () => {
	const { showLoading, showResponse } = useShowCustomerHealth()
	const { t } = useTranslation()

	return (
		<Card>
			<CardBody>
				{showLoading ? (
					<Loading />
				) : (
					<>
						<div className="pt-5">
							<h3 className="font-bold text-gray-900 text-xl">{t('customer_bmi_info')}</h3>
							<ul className="text-lg flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
								<ListItem label={t('name')} value={showResponse?.data?.customer_name} />
								<ListItem label={t('age')} value={showResponse?.data?.age} />
								<ListItem label={t('gender')} value={showResponse?.data?.gender} />
								<ListItem label={t('activity_level')} value={showResponse?.data?.activity_level} />
								<ListItem label={t('goal')} value={showResponse?.data?.goal} />
								<ListItem label={t('height')} value={showResponse?.data?.height} />
								<ListItem label={t('weight')} value={showResponse?.data?.weight} />

								<div className="grid grid-cols-4 justify-start gap-2 text-lg">
									<ListItem className="flex-col" label={t('calories')} value={showResponse?.data?.target_calories} />
									<ListItem className="flex-col" label={t('protein')} value={showResponse?.data?.target_protein} />
									<ListItem className="flex-col" label={t('carbs')} value={showResponse?.data?.target_carbs} />
									<ListItem className="flex-col" label={t('fats')} value={showResponse?.data?.target_fats} />
								</div>

								<div className="grid grid-cols-4 gap-2 text-lg">
									{showResponse?.data?.allergies?.map((item: any, i: number) => (
										<ListItem key={i} className="flex-col" label={item?.name} value={<img className="w-24 h-24 rounded-full" src={item?.image} alt="allergen-img" />} />
									))}
								</div>
							</ul>
						</div>
					</>
				)}
			</CardBody>
		</Card>
	)
}

export default ViewContent
