import { Link } from 'react-router-dom'
import { PopoverLayout } from '../HeadlessUI' // Assuming you have this component ready
import { ReactNode } from 'react'

// Interface to handle the dropdown data structure
interface DropdownOption {
	label: any
	url?: string
	icon?: ReactNode
	onClick?: any
}

const CustomDropdown = ({ options }: { options: DropdownOption[] }) => {
	const PopoverToggle = () => {
		return (
			<span className="font-bold rounded-full w-3 h-3 flex items-center justify-center text-xl">
				...
			</span>
		)
	}

	return (
		<PopoverLayout
			toggler={<PopoverToggle />}
			togglerClass="btn bg-light dark:bg-gray-700 dark:text-white text-sm text-gray-800"
		>
			<ul className="min-w-fit transition-all py-2 duration-300 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-md my-1">
				{options?.map((item: DropdownOption, i) => {
					return item?.url ? (
						<Link
							key={i}
							className="flex items-center gap-1 capitalize py-1.5 px-5 text-sm text-gray-500 hover:bg-light hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
							to={item?.url}
						>
							<span>{item?.icon}</span>
							<span className="text-nowrap">{item?.label}</span>
						</Link>
					) : (
						<li
							onClick={item?.onClick}
							key={i}
							className="flex items-center gap-1 cursor-pointer capitalize py-1.5 px-5 text-sm text-gray-500 hover:bg-light hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
						>
							<span>{item?.icon}</span>
							<span className="text-nowrap">{item?.label}</span>
						</li>
					)
				})}
			</ul>
		</PopoverLayout>
	)
}

export default CustomDropdown
