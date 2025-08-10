import { cn } from '@/utils/utils'

const ListItem = ({
	label,
	value,
	className
}: {
	label: string
	value: any
	className?: string
}) => {
	return (
		<li
			className={cn(
				'flex justify-between items-center text-md gap-x-2 py-3 px-5 font-normal text-gray-800 dark:text-white',
				className
			)}
		>
			<h4 className="capitalize">{label}</h4>
			<div>{value}</div>
		</li>
	)
}
export default ListItem
