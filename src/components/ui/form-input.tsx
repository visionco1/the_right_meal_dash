import { useState, InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import { PhoneInput } from 'react-international-phone'
import { cn } from '@/utils/utils'

// Types
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	type?: string
	name?: string
	value?: any
	onChange?: (e: React.ChangeEvent<any>) => void
	onBlur?: (e: React.FocusEvent<any>) => void
	placeholder?: string
	className?: string
	labelClassName?: string
	labelContainerClassName?: string
	containerClass?: string
	isImageUpload?: boolean
	children?: ReactNode
	rows?: number
	options?: { name?: string; label?: string; value?: string }[]
	isMulti?: boolean
	isClearable?: boolean
	imgWidth?: string
	url?: string
	error?: string
}

// Label Component
const Label = ({ label, htmlFor, className }: { label?: string; htmlFor?: string; className?: string }) => {
	if (!label) return null
	return (
		<label className={cn('font-semibold text-gray-500 capitalize', className)} htmlFor={htmlFor}>
			{label}
		</label>
	)
}

// Password Input
const PasswordInput = ({ name, placeholder, value, onChange, onBlur, className, error }: FormInputProps) => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	return (
		<div className="flex items-center">
			<input
				type={showPassword ? 'text' : 'password'}
				placeholder={placeholder}
				name={name}
				id={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				className={`${className} ${error ? 'border-red-500 text-red-700' : ''} form-input placeholder-gray-300`}
				autoComplete={name}
			/>
			<span className="px-3 py-1 border rounded-e-md -ms-px dark:border-white/10 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
				<i className={`${showPassword ? 'ri-eye-close-line' : 'ri-eye-line'} text-lg`} />
			</span>
		</div>
	)
}

// Profile Image Upload
const ProfileImageUpload = ({ className, imgWidth, title, name, url, onChange }: FormInputProps) => {
	const [image, setImage] = useState<any>(url)

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] ?? null
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => setImage(reader.result)
			reader.readAsDataURL(file)
			onChange?.({ ...e, target: { ...e.target, name, value: file } })
		}
	}

	const handleRemoveImage = () => {
		setImage(null)
		onChange?.({ target: { name, value: null } } as any)
	}

	return (
		<div className={`flex justify-start items-center relative ${className}`}>
			<button type="button" onClick={handleRemoveImage} className="text-center z-10 w-6 h-6 text-xs font-bold absolute top-0 right-0 bg-gray-900 text-white rounded-full">
				X
			</button>
			<div className={`${imgWidth || 'w-24 h-24'} relative bg-gray-200 border-4 border-dashed overflow-hidden border-gray-400 rounded-full`}>
				{image ? (
					<img src={image} alt="Profile" className="w-full h-full object-cover" />
				) : (
					<div className="w-full h-full flex justify-center items-center text-gray-400 text-[14px] text-center">
						<span>{title || 'Select an image'}</span>
					</div>
				)}
				<input type="file" accept="image/*" name={name} onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
			</div>
		</div>
	)
}

// Main Component
const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	(
		{ label, type = 'text', name, value, onChange, onBlur, placeholder, className, labelClassName, labelContainerClassName, containerClass, isImageUpload, children, rows, url, error, ...otherProps },
		ref
	) => {
		const commonProps = {
			name,
			placeholder,
			value,
			onChange,
			onBlur,
			className,
			...otherProps
		}

		if (type === 'hidden') {
			return <input type="hidden" {...commonProps} />
		}

		if (isImageUpload) {
			return (
				<div className={cn('flex flex-col items-center justify-center', containerClass)}>
					<Label label={label} htmlFor={name} className={labelClassName} />
					<ProfileImageUpload name={name} url={url} onChange={onChange} imgWidth="w-24 h-24" title="select image" />
				</div>
			)
		}

		if (type === 'password') {
			return (
				<div className={containerClass}>
					<div className={labelContainerClassName}>
						<Label label={label} htmlFor={name} className={labelClassName} />
						{children}
					</div>
					<PasswordInput {...commonProps} error={error} />
				</div>
			)
		}

		if (type === 'phone') {
			return (
				<div className={cn('max-w-full', containerClass)}>
					<Label label={label} htmlFor={name} className={labelClassName} />
					<PhoneInput inputClassName="w-full" defaultCountry="sa" value={value} onChange={val => onChange?.({ target: { name, value: val } } as any)} />
				</div>
			)
		}

		if (type === 'time' || type === 'date') {
			return (
				<div className={containerClass}>
					<Label label={label} htmlFor={name} className={labelClassName} />
					<input
						type={type}
						{...commonProps}
						className="form-input placeholder-gray-300 !w-full bg-[#f9fafb] dark:bg-gray-600 rounded-md border-gray-300 border-1 focus:border-transparent focus:shadow-none focus:ring-primary"
					/>
				</div>
			)
		}

		if (type === 'textarea') {
			return (
				<div className={cn('relative', containerClass)}>
					<Label label={label} htmlFor={name} className={labelClassName} />
					<textarea
						name={name}
						id={name}
						rows={rows}
						placeholder={placeholder}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						ref={ref as any}
						className={cn(
							'form-input !w-full placeholder-gray-300 bg-[#f9fafb] rounded-md border-gray-300 border-1 focus:border-transparent focus:shadow-none focus:ring-primary',
							error && 'border-red-500 focus:border-red-500 text-red-700',
							className
						)}
						autoComplete={name}
						// {...otherProps}
					/>
				</div>
			)
		}

		if (type === 'checkbox' || type === 'radio') {
			return (
				<div className={containerClass}>
					<div className="flex items-center">
						<input type={type} {...commonProps} className={`form-checkbox rounded text-primary ${error ? 'border-red-500 text-red-700' : ''}`} />
						<Label label={label} htmlFor={name} className={labelClassName} />
					</div>
				</div>
			)
		}

		// Default input
		return (
			<div className={containerClass}>
				<Label label={label} htmlFor={name} className={labelClassName} />
				<input
					type={type}
					{...commonProps}
					ref={ref}
					className={cn(
						'form-input placeholder-gray-300 !w-full bg-[#f9fafb] dark:bg-gray-600 rounded-md border-gray-300 border-1 focus:border-transparent focus:shadow-none focus:ring-primary',
						error && 'border-red-500 focus:border-red-500 text-red-700',
						className
					)}
				/>
			</div>
		)
	}
)

export default FormInput
