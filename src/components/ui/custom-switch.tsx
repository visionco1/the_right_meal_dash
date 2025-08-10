import { cn } from '@/utils/utils'
import React, { useEffect, useState } from 'react'

interface CustomSwitchProps {
	name?: string
	id: any
	label?: string
	labelOn: string
	labelOff: string
	defaultChecked?: boolean
	onChange?: (e: any) => void
	className?: string
	value?: string
	disabled?: boolean
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ name, id, label, labelOn, labelOff, defaultChecked, onChange, className, value, disabled = false }) => {
	const [checked, setChecked] = useState(defaultChecked)

	useEffect(() => {
		setChecked(defaultChecked)
	}, [defaultChecked])

	const handleToggle = (e: any) => {
		// setChecked(!checked);
		if (onChange) {
			onChange(e)
		}
	}

	return (
		<div className={cn(className, 'flex items-center gap-2')}>
			<label className="font-medium text-gray-400 first-letter:uppercase">{label}</label>
			<input name={name} type="checkbox" id={id} checked={checked} disabled={disabled} value={value} onChange={handleToggle} className="switch-input" data-switch="none" />
			<label htmlFor={id} data-on-label={labelOn} data-off-label={labelOff}></label>
		</div>
	)
}

export default CustomSwitch
