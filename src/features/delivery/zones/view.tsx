import { Loading } from '@/components/ui/Loading'
import { useShowSingleZone } from './hooks'
import Map from '@/components/map/map'
import ListItem from '@/components/ui/list-item'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setRectangleCoords } from '@/redux/slices/delivery/zones'
import { useTranslation } from 'react-i18next'
import { Card, CardBody } from '@/components/ui/card'

const ViewZone = () => {
	const { t } = useTranslation()
	const { showLoading, showResponse } = useShowSingleZone()
	const dispatch = useDispatch()

	useEffect(() => {
		const reverseTransform = showResponse?.data?.waypoints?.map((point: any) => [parseFloat(point.lat), parseFloat(point.long)])
		dispatch(setRectangleCoords(reverseTransform))
	}, [showLoading, showResponse])

	return (
		<Card>
			<CardBody>
				{showLoading ? (
					<Loading />
				) : (
					<>
						<ul className="text-lg flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
							<ListItem label={t('name')} value={showResponse?.data?.localized_name} />
							<ListItem label={t('country')} value={showResponse?.data?.country?.localized_name} />
							<ListItem label={t('state')} value={showResponse?.data?.branch?.state?.name} />
							<ListItem label={t('city')} value={showResponse?.data?.city?.localized_name} />
							<ListItem label={t('branch')} value={showResponse?.data?.branch?.localized_name} />
						</ul>
						<div className="h-[600px] flex items-end">
							<Map showReset={false} />
						</div>
					</>
				)}
			</CardBody>
		</Card>
	)
}

export default ViewZone
