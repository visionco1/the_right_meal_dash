import { Tab } from '@headlessui/react'
import { useTranslation } from 'react-i18next'

const DayTab = ({ item }: { item: any }) => {
	const { t } = useTranslation()
	return (
		<Tab
			key={item?.id}
			type="button"
			className={({ selected }: { selected: boolean }) =>
				`flex items-center justify-center !m-0 relative w-fit min-w-fit min-h-[50px] 
        flex-1 bg-white first:border-l-0 border-l border-b-2 p-5 text-gray-500 text-sm
        font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 dark:bg-gray-800
        dark:border-l-gray-700 dark:border-b-gray-700 dark:hover:bg-gray-700
        dark:hover:text-gray-400 ${selected ? 'border-b-primary text-gray-900 dark:text-white' : 'hover:bg-gray-50 hover:text-gray-700'}`
			}
		>
			{t(item?.day?.toLowerCase())}
		</Tab>
	)
}

export default DayTab
