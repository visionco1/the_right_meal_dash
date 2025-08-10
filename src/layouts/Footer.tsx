import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Footer = () => {
	const { t } = useTranslation()
	const website_url = import.meta.env.VITE_WEBSITE_URL
	return (
		<React.Fragment>
			<footer className="footer h-16 flex items-center px-6 bg-white shadow dark:bg-gray-800 mt-auto">
				<div className="flex md:justify-between justify-center w-full gap-4">
					<div>
						{new Date().getFullYear()} © -{' '}
						<Link to={website_url} target="_blank">
							The Right Meal
						</Link>
					</div>
					<div className="md:flex hidden gap-4 item-center md:justify-end capitalize">
						<Link to={website_url} className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
							{t('about')}
						</Link>
						<Link to={website_url} className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
							{t('support')}
						</Link>
						<Link to={website_url} className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
							{t('contact_us')}
						</Link>
					</div>
				</div>
			</footer>
		</React.Fragment>
	)
}

export default Footer
