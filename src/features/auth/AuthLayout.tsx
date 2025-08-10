import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

// images
import logo from '@/assets/images/logo.png'
import logoDark from '@/assets/images/logo-dark.png'
import { Loading } from '@/components/ui/Loading'

interface AccountLayoutProps {
	pageImage?: string
	authTitle?: string
	helpText?: string
	bottomLinks?: ReactNode
	isCombineForm?: boolean
	children?: ReactNode
	hasForm?: boolean
	loading?: boolean
}

const AuthLayout = ({
	pageImage,
	authTitle,
	helpText,
	bottomLinks,
	children,
	loading
}: AccountLayoutProps) => {
	return (
		<>
			<div className="relative flex flex-col items-center justify-center h-screen">
				<div className="flex justify-center">
					<div className="max-w-4xl px-4 mx-auto">
						<div className="card overflow-hidden relative">
							{loading && <Loading />}
							<div className="p-4 bg-primary">
								<Link to="/" className="flex justify-center">
									<img src={logo} alt="logo" className="h-12 block dark:hidden" />
									<img src={logoDark} alt="logo" className="h-12 hidden dark:block" />
								</Link>
							</div>
							<div className="p-9">
								<div className="text-center mx-auto w-3/4">
									{pageImage && (
										<img src={pageImage} alt="mail sent image" className="h-16 mx-auto" />
									)}
									<h4
										className={`${pageImage ? 'mt-9' : ''} text-dark/70 text-center text-lg font-bold dark:text-light/80 mb-2`}
									>
										{authTitle}
									</h4>
									<p className="text-gray-400 mb-9">{helpText}</p>
								</div>

								{children}
							</div>
						</div>
						{bottomLinks}
					</div>
				</div>
			</div>

			<footer className="absolute bottom-0 inset-x-0">
				<Link to={'https://therightmeal.com'} className="font-medium text-center p-6">
					{new Date().getFullYear()} © The Right Meal
				</Link>
			</footer>
		</>
	)
}

export default AuthLayout
