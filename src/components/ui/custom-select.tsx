import { cn } from '@/utils/utils'
import { forwardRef } from 'react'
import Select from 'react-select'

// TypeScript interface for the custom select component props
type CustomSelectProps = {
	label: string
	isMulti?: boolean
	isClearable?: boolean
	isDisabled?: boolean
	placeholder?: string
	optionLabel: string
	optionValue: string
	customStyles?: any
	option?: any
	className?: string
	[key: string]: any
}
// the custom style
export const customStyles = {
	control: (styles: any) => ({
		// ...styles,
		backgroundColor: '#ddd',
		borderColor: '#d1d5db',
		borderRadius: '10px',
		padding: '2px 8px',
		boxShadow: 'none',
		'&:hover': {
			borderColor: '#4b5563'
		}
	}),
	option: (styles: any, { isSelected, isFocused }: any) => ({
		...styles,
		backgroundColor: isSelected ? '#08c51a' : isFocused ? '#e5e7eb' : undefined,
		color: isSelected ? '#fff' : '#333',
		padding: '8px 12px'
	}),
	menu: (styles: any) => ({
		...styles,
		borderRadius: '8px',
		marginTop: '8px',
		boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
	}),
	placeholder: (styles: any) => ({
		...styles,
		color: '#6b7280'
	}),
	multiValue: (styles: any) => ({
		...styles,
		backgroundColor: '#08c51a',
		color: '#fff',
		borderRadius: '12px',
		padding: '2px 8px'
	}),
	multiValueLabel: (styles: any) => ({
		...styles,
		color: '#fff'
	}),
	multiValueRemove: (styles: any) => ({
		...styles,
		color: '#fff',
		':hover': {
			backgroundColor: '#e53935',
			color: '#fff'
		}
	})
}

const CustomSelect = forwardRef<HTMLDivElement, CustomSelectProps>(
	({ label, isDisabled, isMulti = false, isClearable = true, placeholder = 'Select...', className, optionLabel, optionValue, option, customStyles, ...props }, ref) => {
		// Function to get nested values from objects
		const getNestedValue = (obj: any, path: string) => {
			return path?.split('.')?.reduce((acc: any, key: string) => acc && acc[key], obj)
		}
		return (
			<div className={cn('custom-select-container', className)} ref={ref}>
				<label className="text-sm font-medium first-letter:uppercase text-gray-700">{label}</label>
				<Select
					isDisabled={isDisabled}
					isMulti={isMulti}
					isClearable={isClearable}
					placeholder={placeholder}
					className="react-select-container custom-scroll bg-[#f9fafb]"
					classNamePrefix="react-select"
					styles={customStyles}
					getOptionLabel={option ? option : (option: any) => getNestedValue(option, optionLabel)}
					getOptionValue={(option: any) => getNestedValue(option, optionValue)}
					{...props}
				/>
			</div>
		)
	}
)

export default CustomSelect
