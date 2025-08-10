import { cn } from '@/utils/utils'
import { Link } from 'react-router-dom'

type TProps = {
	to?: string
	title?: string
	icon?: React.ReactNode
	className?: string
	onClick?: () => void
}
const Icon = ({ to, title, icon, className, onClick }: TProps) => {
	return to ? (
		<Link
			to={to}
			className={cn(
				className,
				'flex items-center gap-1 bg-gray-200 rounded-full text-gray-800 py-1 px-2 w-fit text-md'
			)}
		>
			{icon} {title && <span>{title}</span>}
		</Link>
	) : (
		<p
			onClick={onClick}
			className={cn(
				className,
				'flex items-center cursor-pointer gap-1 bg-gray-200 rounded-full text-gray-800 py-1 px-2 w-fit text-md'
			)}
		>
			{icon} {title && <span>{title}</span>}
		</p>
	)
}

export default Icon
