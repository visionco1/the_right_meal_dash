import * as React from 'react'
import { cn } from '@/utils/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import { Loading } from './Loading'

const buttonVariants = cva('rounded transtions-all duration-200 leading-none flex items-center justify-center', {
	variants: {
		variant: {
			primary: 'bg-primary btn text-white mx-1 border-primary hover:bg-white hover:text-primary',
			default: 'text-white bg-primary/80 hover:bg-primary',
			secondary: 'text-white bg-secondary/80 hover:bg-secondary',
			success: 'bg-green-600 text-white hover:bg-green-700',
			destructive: 'bg-red-400 text-white hover:bg-red-500',
			warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
			info: 'bg-blue-400 text-white hover:bg-blue-500',
			// light: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
			light: 'bg-white btn text-gray-700 mx-1 border-primary hover:bg-primary hover:text-white',
			dark: 'bg-gray-700 text-white hover:bg-gray-800',
			link: 'text-blue-400 hover:text-blue-600 underline !p-0 bg-transparent inline'
		},
		outline: {
			true: 'bg-transparent border',
			false: ''
		},
		size: {
			default: 'h-10 py-2 px-4 rounded-md',
			sm: 'h-9 px-2',
			lg: 'h-11 px-8 rounded-md'
		},
		font: {
			default: 'font-normal',
			light: 'font-light',
			medium: 'font-medium',
			bold: 'font-bold'
		},
		disabled: {
			true: 'opacity-60 cursor-not-allowed line-through',
			false: ''
		}
	},
	compoundVariants: [
		{
			outline: true,
			variant: 'default',
			className: 'border-primary text-primary hover:bg-primary hover:text-white'
		},
		{
			outline: true,
			variant: 'secondary',
			className: 'border-secondary text-secondary hover:bg-secondary hover:text-white'
		},
		{
			outline: true,
			variant: 'success',
			className: 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
		},
		{
			outline: true,
			variant: 'destructive',
			className: 'border-red-400 text-red-400 hover:bg-red-400 hover:text-white'
		},
		{
			outline: true,
			variant: 'warning',
			className: 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white'
		},
		{
			outline: true,
			variant: 'info',
			className: 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
		},
		{
			outline: true,
			variant: 'light',
			className: 'border-white text-white hover:bg-gray-100 hover:text-gray-700'
		},
		{
			outline: true,
			variant: 'dark',
			className: 'border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white'
		}
	],
	defaultVariants: {
		variant: 'default',
		outline: false,
		size: 'default',
		font: 'default'
	}
})

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	href?: string
	target?: string
	disabled?: boolean
	type?: 'submit' | 'reset' | 'button'
	loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, href, target, variant, outline, size, font, disabled, type = 'button', loading = false, ...props }, ref) => {
	const classes = cn('relative', buttonVariants({ variant, outline, size, font, disabled }), className)
	if (href) {
		return (
			<Link to={href} className={classes} {...(target ? { target } : '')}>
				{children}
			</Link>
		)
	}
	return (
		<button type={type || 'button'} className={classes} ref={ref} disabled={disabled ?? false} {...props}>
			{loading && <Loading />}
			<span className="first-letter:uppercase">{children}</span>
		</button>
	)
})

export { Button, buttonVariants }
