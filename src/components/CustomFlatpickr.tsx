import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'
import { cn } from '@/utils/utils'

interface FlatpickrProps {
	className?: string
	value?: Date | [Date, Date]
	options?: any
	placeholder?: string
	label?: string
	onChange?: any
}

const CustomFlatpickr = ({
	className,
	value,
	options,
	placeholder,
	label,
	onChange
}: FlatpickrProps) => {
	return (
		<div className="flex flex-col">
			<label>{label}</label>
			<Flatpickr
				onChange={onChange}
				className={cn('rounded-lg h-[45px] bg-[#f9fafb]', className)}
				data-enable-time
				value={value}
				options={options}
				placeholder={placeholder}
			/>
		</div>
	)
}

export default CustomFlatpickr
