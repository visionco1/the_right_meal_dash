import { Link } from 'react-router-dom'
import PopoverLayout from './HeadlessUI/PopoverLayout'
import { APICore } from '@/helpers/api/apiCore'
import profilePic from '@/assets/images/users/avatar-7.jpg'
import { cn } from '@/utils/utils'
import { useTranslation } from 'react-i18next'

interface ListItemProps {
	title: string
	to?: string
	icon: string
	className?: string
	iconClassName?: string
	onClick?: () => void
}
const ProfileDropDown = () => {
	const { t } = useTranslation()
	const api = new APICore()
	const user = api.getLoggedInUser()
	const PopoverToggler = () => {
		return (
			<>
				<img src={user?.data?.avatar?.url || profilePic} alt="user-img" className="rounded-full h-8" />
				<span className="md:flex flex-col gap-0.5 text-start hidden">
					<h5 className="text-sm">{user?.data?.f_name}</h5>
					<span className="text-xs">{user?.data?.role?.localized_name || ''}</span>
				</span>
			</>
		)
	}

	const ListItem = ({ title, to, icon, className, onClick }: ListItemProps) => {
		const baseClasses = 'flex items-center cursor-pointer gap-2 py-1.5 px-4 text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300'

		if (to) {
			return (
				<Link to={to} className={cn(baseClasses, className)}>
					<i className={cn('text-lg align-middle', icon)}></i>
					<span>{title}</span>
				</Link>
			)
		} else {
			return (
				<li className={cn(baseClasses, className)} onClick={onClick}>
					<i className={cn('text-lg align-middle', icon)}></i>
					<span>{title}</span>
				</li>
			)
		}
	}

	return (
		<>
			<PopoverLayout placement="bottom-end" togglerClass="nav-link flex items-center gap-2.5 px-3 bg-black/5 border-x border-black/10" toggler={<PopoverToggler />}>
				<div className="mt-1 end-0 absolute w-44 z-50 transition-all duration-300 bg-white shadow-lg border rounded-lg py-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800">
					<h6 className="flex items-center py-2 px-3 text-xs text-gray-800 dark:text-gray-400">{t('welcome')}</h6>
					<ul>
						<ListItem title={t('my account')} to="/profile" icon="ri-account-circle-line" />
						{/* <ListItem title="Settings" to="/pages/profile" icon="ri-settings-4-line" /> */}
						{/* <ListItem title="Support" to="/pages/faq" icon="ri-customer-service-2-line" /> */}
						{/* <ListItem title="Lock Screen" to="/auth/lock-screen" icon="ri-lock-password-line" /> */}
						<ListItem title={t('logout')} to="/auth/logout" icon="ri-logout-box-line" />
					</ul>
				</div>
			</PopoverLayout>
		</>
	)
}

export default ProfileDropDown
