import { FormInput } from '@/components'
import { useGetAllPermissions } from '@/features/staff/permissions/hooks'
import { useUpdateRole } from '@/features/staff/roles/hooks'
import CustomSwitch from '@/components/ui/custom-switch'
import { Loading } from '@/components/ui/Loading'
import { Tab } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { Card, CardBody } from '@/components/ui/card'

interface TabContentItem {
	id: number
	title: string
	content: any
}

const ViewRoleContent = () => {
	const { t } = useTranslation()
	const { data, loading } = useGetAllPermissions()
	const { showLoading, showResponse, handleChangeFrom } = useUpdateRole()

	const tabContents: TabContentItem[] = Object?.keys(data?.data || {})?.map((key, index) => {
		const title = key.charAt(0).toUpperCase() + key.slice(1)
		const content = showResponse && !showLoading && (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-center">
				{data?.data[key]?.map((item: any) => (
					<CustomSwitch
						className="justify-end my-3"
						disabled
						key={item?.id}
						label={item?.name?.en}
						id={item?.id}
						value={item?.id}
						defaultChecked={showResponse?.data?.permissions[key]?.filter((el: any) => el?.id == item?.id)?.[0]?.id == item?.id}
						labelOff={t('off')}
						labelOn={t('on')}
						onChange={handleChangeFrom}
						name="permissions"
					/>
				))}
			</div>
		)

		return {
			id: index + 1,
			title,
			content
		}
	})

	return (
		<Card>
			<CardBody>
				{(showLoading || loading) && <Loading />}
				<div className="px-6 py-8">
					{showResponse && !showLoading && (
						<form className="relative">
							<div className="flex justify-between gap-5 items-center">
								<div className="basis-1/2">
									<FormInput disabled defaultValue={showResponse?.data?.name?.ar} onChange={handleChangeFrom} name="display_name:ar" label={t('name_ar')} />
								</div>
								<div className="basis-1/2">
									<FormInput disabled defaultValue={showResponse?.data?.name?.en} onChange={handleChangeFrom} name="display_name:en" label={t('name_en')} />
								</div>
							</div>
							<Tab.Group>
								<div className="w-[calc(100vw-100px)] md:w-[calc(100vw-200px)] lg:w-[calc(100vw-500px)] overflow-auto my-5">
									<Tab.List as="nav" className="relative z-0 flex border rounded-xl dark:border-gray-600 my-4">
										{tabContents?.map((tab, idx) => (
											<Tab
												key={idx}
												type="button"
												className={({ selected }) =>
													`w-fit min-w-fit p-5 flex items-center justify-center !m-0 relative min-h-[50px] flex-1 bg-white first:border-l-0 border-l border-b-2 text-gray-500 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 dark:bg-gray-800 dark:border-l-gray-700 dark:border-b-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-400 ${
														selected ? 'border-b-primary text-gray-900 dark:text-white' : 'hover:bg-gray-50 hover:text-gray-700'
													}`
												}
											>
												{t(tab.title.toLowerCase())}
											</Tab>
										))}
									</Tab.List>
								</div>
								<Tab.Panels>
									{tabContents?.map((tab, idx) => (
										<Tab.Panel key={idx}>
											<div className="text-gray-500 dark:text-gray-400">{tab.content}</div>
										</Tab.Panel>
									))}
								</Tab.Panels>
							</Tab.Group>
						</form>
					)}
				</div>
			</CardBody>
		</Card>
	)
}

export default ViewRoleContent
