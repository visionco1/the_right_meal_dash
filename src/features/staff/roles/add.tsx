import { FormInput } from '@/components'
import { useGetAllPermissions } from '@/features/staff/permissions/hooks'
import { useCreateRole } from '@/features/staff/roles/hooks'
import { Button } from '@/components/ui/button'
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

const AddRoleContent = () => {
	const { t } = useTranslation()
	const { data } = useGetAllPermissions()
	const { createLoading, handleCreateRole, handleChangeFrom, data: createdData } = useCreateRole()

	const tabContents: TabContentItem[] = Object?.keys(data?.data || {})?.map((key, index) => {
		const title = key.charAt(0).toUpperCase() + key.slice(1)
		const content = (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-center">
				{data?.data[key]?.map((item: any) => (
					<CustomSwitch
						className="justify-end my-3"
						key={item?.id}
						label={item?.name?.en}
						defaultChecked={createdData?.permissions?.includes(String(item?.id))}
						id={item?.id}
						value={item?.id}
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
				{createLoading && <Loading />}
				<form onSubmit={handleCreateRole} className="relative">
					<div className="flex justify-between gap-5 items-center flex-wrap sm:flex-nowrap">
						<div className="w-full sm:basis-1/2">
							<FormInput onChange={handleChangeFrom} name="display_name:ar" label={t('name_ar')} placeholder={t('name_ar')} />
						</div>
						<div className="w-full sm:basis-1/2">
							<FormInput onChange={handleChangeFrom} name="display_name:en" label={t('name_en')} placeholder={t('name_en')} />
						</div>
					</div>
					<div className="overflow-hidden">
						<Tab.Group>
							<div className="w-[calc(100vw-100px)] md:w-[calc(100vw-200px)] lg:w-[calc(100vw-500px)] overflow-auto my-5">
								<Tab.List as="nav" className="w-full relative z-0 flex border rounded-xl dark:border-gray-600 my-4">
									{tabContents?.map((tab, idx) => (
										<Tab
											key={idx}
											type="button"
											className={({ selected }) =>
												`flex items-center justify-center !m-0 relative w-fit min-w-fit min-h-[50px] flex-1 bg-white first:border-l-0 border-l border-b-2 p-5 text-gray-500 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 dark:bg-gray-800 dark:border-l-gray-700 dark:border-b-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-400 ${selected ? 'border-b-primary text-gray-900 dark:text-white' : 'hover:bg-gray-50 hover:text-gray-700'}`
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
					</div>
					<Button variant={'primary'} className="mt-10 px-8" type="submit">
						{t('save')}
					</Button>
				</form>
			</CardBody>
		</Card>
	)
}

export default AddRoleContent
