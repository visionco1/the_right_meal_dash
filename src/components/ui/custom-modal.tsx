import React, { useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { cn } from '@/utils/utils'
import { Loading } from './Loading'
import { isFunction } from '@/helpers/helpers'

type TMState = {
	isOpen: boolean
	setIsOpen: (e: boolean) => void
}

type TModalClassName = Partial<{
	classNameContainer: string
	classNameModal: string
	classNameContent: string
	classNameHead: string
	classNameBody: string
	overlay: string
}>

type TCustomModal = {
	titleHead?: string | React.ReactNode
	buttonName?: string | React.ReactNode
	body: React.ReactNode
	buttonContent?: React.ReactNode
	footer?: React.ReactNode
	button?: ({ isOpen, setIsOpen }: TMState) => React.ReactNode
	checkOpen?: (isOpen: TMState['isOpen']) => void
	onClose?: () => void
	open?: boolean
	loading?: boolean
	closeOnClickOut?: boolean
	position?: 'top' | 'bottom' | 'center'
	isOpen?: boolean
	setIsOpen?: (e: boolean) => void
} & TModalClassName

export const CustomModal = ({
	titleHead = 'Modal Title',
	buttonName,
	body,
	footer,
	button,
	buttonContent,
	checkOpen,
	onClose,
	loading = false,
	closeOnClickOut,
	position = 'center', // Default to 'center' if not provided
	classNameContainer,
	classNameModal,
	classNameContent,
	classNameHead,
	overlay,
	classNameBody,
	isOpen: isOpenProp, // External control for modal open state
	setIsOpen: setIsOpenProp // External setter for modal open state
}: TCustomModal) => {
	const [isOpen, setIsOpen] = useState(false)

	// Sync with the external control if 'isOpen' prop is passed
	useEffect(() => {
		if (isOpenProp !== undefined) {
			setIsOpen(isOpenProp) // External open state control
		}
	}, [isOpenProp])

	// Handle modal close and syncing the state with external setter
	const handleModalClose = () => {
		setIsOpen(false)
		if (setIsOpenProp) {
			setIsOpenProp(false) // Ensure external state is also updated
		}
		if (onClose) {
			onClose() // Trigger onClose callback if provided
		}
	}

	// Map the position to Tailwind CSS classes
	const positionClasses = {
		top: 'justify-center items-start',
		bottom: 'justify-center items-end',
		center: 'justify-center items-center'
	}

	// Handle modal open toggle
	const handleModalOpen = () => {
		setIsOpen(true)
		if (setIsOpenProp) {
			setIsOpenProp(true) // Ensure external state is also updated
		}
	}

	return (
		<div className={classNameContainer ?? ''}>
			{button ? (
				button({ isOpen, setIsOpen })
			) : (
				<div onClick={handleModalOpen}>
					{isFunction(buttonContent) ? buttonContent : buttonContent}
				</div>
			)}

			{isOpen && (
				<div
					className={cn(
						'fixed z-50 inset-0 pt-[130px] pb-[40px] flex',
						positionClasses[position], // Use the position classes
						classNameModal
					)}
				>
					{/* start bg */}
					<div
						className={cn('absolute inset-0 bg-black/40', overlay)}
						onClick={() => closeOnClickOut && handleModalClose()}
					></div>

					{/* start content */}
					<div
						className={cn(
							'relative flex flex-col max-h-full max-w-max mx-auto overflow-auto bg-white dark:bg-gray-800 rounded-md [&>*]:p-3',
							classNameContent
						)}
					>
						{/* start loading */}
						{loading && <Loading />}

						{/* start head */}
						<div
							className={cn('flex justify-between !p-5', titleHead && 'border-b', classNameHead)}
						>
							<h3 className="font-bold capitalize text-gray-900 dark:text-white text-lg">
								{titleHead}
							</h3>
							<button className="text-2xl font-bold" type="button" onClick={handleModalClose}>
								<IoCloseSharp />
							</button>
						</div>

						{/* start body */}
						<div
							className={cn(
								'custom-scroll relative flex flex-col gap-4 flex-1 overflow-visible',
								classNameBody
							)}
						>
							{isFunction(body) ? body : body}
						</div>

						{/* start footer */}
						{footer && (
							<div className={cn('relative flex gap-2 justify-end', classNameBody)}>
								{isFunction(footer) ? footer : footer}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default CustomModal
