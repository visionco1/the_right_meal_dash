import React, { ReactNode, Children } from 'react'
import { Resolver, useForm, FieldValues, Controller } from 'react-hook-form'
import CustomSelect from './ui/custom-select'

interface VerticalFormProps<TFormValues extends FieldValues> {
	defaultValues?: any
	resolver?: Resolver<TFormValues>
	children?: ReactNode
	onSubmit: (data: TFormValues) => void
	onChange?: (data: TFormValues) => any
	formClass?: string
}

const VerticalForm = <TFormValues extends FieldValues = FieldValues>({
	defaultValues,
	resolver,
	children,
	onSubmit,
	onChange,
	formClass
}: VerticalFormProps<TFormValues>) => {
	// Form methods from react-hook-form
	const methods = useForm<TFormValues>({ defaultValues, resolver })

	const {
		handleSubmit,
		register,
		control,
		formState: { errors }
	} = methods

	// Recursive rendering of children to apply react-hook-form props
	const renderChildren = (children: ReactNode): ReactNode => {
		return Children.map(children, (child: ReactNode, index: number) => {
			if (React.isValidElement(child)) {
				// Check if the child has a 'name' prop, which indicates a form control
				if (child.props.name) {
					if (child.props.id === 'select') {
						return (
							<Controller
								name={child.props.name}
								control={control}
								render={({ field }) => (
									<CustomSelect
										{...field}
										label={child.props.label}
										name={child.props.name}
										options={child.props.options}
										placeholder={child.props.placeholder}
										optionLabel={child.props.optionLabel}
										optionValue={child.props.optionValue}
										isMulti={child.props.isMulti}
										isDisabled={child.props.isDisabled}
										option={child.props.option}
									/>
								)}
								key={child.props.name || index}
							/>
						)
					}
					return React.cloneElement(child as any, {
						register,
						errors,
						control,
						key: child.props.name || index,
						id: child.props.name || index
					})
				}

				if (child.props.children) {
					return React.cloneElement(child as any, {
						children: renderChildren(child.props.children),
						key: index
					})
				}
			}

			return child
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={formClass ?? ''} noValidate>
			{renderChildren(children)}
		</form>
	)
}

export default VerticalForm
