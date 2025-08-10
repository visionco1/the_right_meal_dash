import React from 'react'
import { cn } from '@/utils/utils'

export const Card = ({ className, ...props }: React.ComponentProps<'div'>) => {
	return <div className={cn('flex flex-col gap-6', className)} {...props} />
}
export const CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
	return <div className={cn('flex', className)} {...props} />
}
export const CardBody = ({ className, ...props }: React.ComponentProps<'div'>) => {
	return <div className={cn('card relative p-10 min-h-[50vh]', className)} {...props} />
}
