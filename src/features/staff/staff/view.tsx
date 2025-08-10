import { useShowAdmin } from './hooks'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/ui/Loading'
import ListItem from '@/components/ui/list-item'
import { useTranslation } from 'react-i18next'

const ViewStaff = () => {
	const { showLoading, showResponse } = useShowAdmin()
	const { t } = useTranslation()
	console.log(showResponse)
	return (
		<div className="flex flex-col gap-6">
			<div className="flex">
				<Button>{t('export_excel')}</Button>
			</div>
			<div className="card p-5 relative">
				{showLoading && <Loading />}
				<div className="pt-5">
					<ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
						<ListItem label={t('avatar')} value={<img className="w-20 h-20 rounded-full" src={showResponse?.data?.avatar?.url} alt="staff-img" />} />
						{/* <ListItem label="Name" value={showResponse?.data?.name} /> */}
						<ListItem label={t('first_name')} value={showResponse?.data?.f_name} />
						<ListItem label={t('last_name')} value={showResponse?.data?.l_name} />
						<ListItem label={t('role')} value={showResponse?.data?.role?.localized_name} />
						<ListItem label={t('phone')} value={showResponse?.data?.phone} />
						<ListItem label={t('email')} value={showResponse?.data?.email} />
						<ListItem label={t('permitted_branches')} value={showResponse?.data?.permitted_branches?.map((item: any) => item?.name?.en)?.join(',')} />
					</ul>
				</div>
			</div>
		</div>
	)
}

export default ViewStaff
