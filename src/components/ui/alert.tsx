import { AppDispatch } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface TType {
	type: 'success' | 'danger' | 'warning' | 'info'
	message: string | null | undefined
	reset?: any
}

interface IconAlertVariant {
	variant: string
	icon: string
}

const Alert = ({ type, message, reset }: TType) => {
	const dispatch = useDispatch<AppDispatch>()
	const [isVisible, setIsVisible] = useState<boolean>(true)
	const [messageState, setMessageState] = useState<string | null>()

	useEffect(() => {
		setIsVisible(true)
		setMessageState(message)
	}, [message])

	const iconAlertVariants: IconAlertVariant[] = [
		{
			variant: 'success',
			icon: 'ri-check-line'
		},
		{
			variant: 'danger',
			icon: 'ri-close-circle-line'
		},
		{
			variant: 'warning',
			icon: 'ri-alert-line'
		},
		{
			variant: 'info',
			icon: 'ri-information-line'
		}
	]

	if (!message || !isVisible) return null

	const handleClose = () => {
		if (reset) {
			dispatch(reset)
		}
		setIsVisible(false)
	}

	return (
		<div
			className={`bg-${type}/10 text-${type} border border-${type}/20 text-sm rounded-md py-3 px-5 my-2 w-full`}
		>
			<div className="flex items-center gap-1.5">
				<i
					className={`${iconAlertVariants.find(variant => variant.variant === type)?.icon} text-base`}
				></i>
				<p className="text-sm flex-grow">{messageState}</p>
				<button
					onClick={handleClose}
					className="ml-3 text-lg text-gray-500 hover:text-gray-700 focus:outline-none"
				>
					&times;
				</button>
			</div>
		</div>
	)
}

export default Alert
