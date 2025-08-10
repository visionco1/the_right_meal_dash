import { cn } from '@/utils/utils'
import React from 'react'
import { FaPrint } from 'react-icons/fa6'
import { Button } from './button'
import { useReactToPrint } from 'react-to-print'

type TProps = {
	printRef: React.MutableRefObject<null> | null
	disabled?: boolean
	className?: string
	name: string
}
const ButtonPrint = ({ printRef, disabled, className, name }: TProps) => {
	// const handlePrint = useReactToPrint({
	//   content: () => printRef ? printRef.current :null
	// })
	// const reactToPrintFn = useReactToPrint({ printRef }as any);

	if (!printRef) return
	return (
		<Button variant={'primary'} disabled={disabled} className={cn('text-sm px-3', className)}>
			{name} <FaPrint className="inline" />
		</Button>
	)
}

export default ButtonPrint
