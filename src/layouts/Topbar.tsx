import React from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

// hooks
import { useViewPort } from '../hooks'

// constants
import { SideBarType, LayoutTheme } from '../constants'

// assets
// import avatar2 from '@/assets/images/users/avatar-2.jpg'
// import avatar4 from '@/assets/images/users/avatar-4.jpg'

// import TopBarSearch from '../components/TopBarSearch'
import LanguageDropdown from '../components/lang-dropdown'
// import NotificationDropdown from '../components/NotificationDropDown'
// import AppsDropDown from '../components/AppsDropDown'
// import MaximizeScreen from '../components/MaximizeScreen'
import ProfileDropDown from '../components/ProfileDropDown'
import LogoBox from '../components/LogoBox'
import { changeLayoutTheme, changeSideBarType, showRightSidebar } from '@/redux/slices/layout/layout'
import { Link } from 'react-router-dom'

export interface NotificationItem {
	id: number
	text: string
	subText: string
	icon?: string
	avatar?: string
	bgColor?: string
	createdAt: Date
}

// notification items

// const notifications: NotificationItem[] = [
// 	{
// 		id: 1,
// 		text: 'Datacorp',
// 		subText: 'Caleb Flakelar commented on Admin',
// 		icon: 'ri-message-3-line text-lg',
// 		bgColor: 'primary',
// 		createdAt: subtractHours(new Date(), 1)
// 	},
// ]

//profile menu items

// for subtraction minutes
// function subtractHours(date: Date, minutes: number) {
// 	date.setMinutes(date.getMinutes() - minutes)
// 	return date
// }

const TopBar = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { width } = useViewPort()

	const { layoutTheme, sideBarType } = useSelector((state: RootState) => ({
		layoutTheme: state.layoutReducer.layoutTheme,
		sideBarType: state.layoutReducer.sideBarType
	}))

	//Toggle the left menu when having mobile screen
	const handleLeftMenuCallBack = () => {
		const HTMLTag = document.getElementsByTagName('html')[0]
		if (width < 1140) {
			if (sideBarType === SideBarType.LEFT_SIDEBAR_TYPE_SMALL) {
				dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT))
			} else if (sideBarType === SideBarType.LEFT_SIDEBAR_TYPE_MOBILE) {
				showLeftSideBarBackdrop()
				HTMLTag.classList.add('sidenav-enable')
			} else {
				dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_SMALL))
			}
		} else if (sideBarType === SideBarType.LEFT_SIDEBAR_TYPE_SMALL || sideBarType === SideBarType.LEFT_SIDEBAR_TYPE_HIDDEN) {
			dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT))
		} else if (sideBarType === SideBarType.LEFT_SIDEBAR_TYPE_MOBILE) {
			showLeftSideBarBackdrop()
			HTMLTag.classList.add('sidenav-enable')
		} else {
			dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_SMALL))
		}
	}

	//toggling style to the body tag
	function toggleBodyStyle(set: boolean) {
		if (set == false) {
			document.body.removeAttribute('style')
		} else {
			document.body.style.overflow = 'hidden'
			document.body.style.paddingRight = '16px'
		}
	}

	// creates backdrop for left sidebar
	function showLeftSideBarBackdrop() {
		const backdrop = document.createElement('div')
		backdrop.id = 'custom-backdrop'
		backdrop.className = 'transition-all fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80'
		document.body.appendChild(backdrop)

		backdrop.addEventListener('click', function () {
			document.getElementsByTagName('html')[0].classList.remove('sidenav-enable')
			toggleBodyStyle(false)
			dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_MOBILE))
			hideLeftSideBarBackdrop()
		})
	}

	function hideLeftSideBarBackdrop() {
		const backdrop = document.getElementById('custom-backdrop')
		document.getElementsByTagName('html')[0].classList.remove('sidenav-enable')
		if (backdrop) {
			document.body.removeChild(backdrop)
			document.body.style.removeProperty('overflow')
		}
	}

	// Toggle Dark Mode
	const toggleDarkMode = () => {
		if (layoutTheme === 'dark') {
			dispatch(changeLayoutTheme(LayoutTheme.THEME_LIGHT))
		} else {
			dispatch(changeLayoutTheme(LayoutTheme.THEME_DARK))
		}
	}

	// Toggles the right sidebar
	const handleRightSideBar = () => {
		dispatch(showRightSidebar())
	}

	return (
		<React.Fragment>
			<header className="app-header flex items-center gap-3.5">
				<LogoBox />

				<button id="button-toggle-menu" className="nav-link p-2" onClick={handleLeftMenuCallBack}>
					<span className="sr-only">Menu Toggle Button</span>
					<span className="flex items-center justify-center">
						<i className="ri-menu-2-fill text-2xl"></i>
					</span>
				</button>

				{/* <div className="relative hidden lg:block">
					<TopBarSearch />
				</div> */}

				{/* <div className="relative lg:flex hidden">
					<NotificationDropdown notifications={notifications} />
				</div> */}

				{/* <div className="relative lg:flex hidden">
					<AppsDropDown />
				</div>  */}

				<div className="relative">
					<LanguageDropdown />
				</div>

				<div className="flex relative ms-auto">
					<button type="button" className="nav-link p-2" onClick={handleRightSideBar}>
						<span className="sr-only">Customization</span>
						<span className="flex items-center justify-center">
							<i className="ri-settings-3-line text-2xl"></i>
						</span>
					</button>
				</div>

				<div className="lg:flex hidden">
					<button id="light-dark-mode" type="button" className="nav-link p-2" onClick={toggleDarkMode}>
						<span className="sr-only">Light/Dark Mode</span>
						<span className="flex items-center justify-center">
							<i className="ri-moon-line text-2xl block dark:hidden"></i>
							<i className="ri-sun-line text-2xl hidden dark:block"></i>
						</span>
					</button>
				</div>

				<div className="md:flex hidden">
					{/* <MaximizeScreen /> */}
					<Link className="relative" to={'/marketing-management/notifications'}>
						<span className="flex items-center justify-center">
							<i className="ri-notification-3-line text-2xl"></i>
							<span className="absolute top-1 end-0.5 w-2 h-2 rounded-full bg-danger"></span>
						</span>
					</Link>
				</div>

				<div className="relative">
					<ProfileDropDown />
				</div>
			</header>
		</React.Fragment>
	)
}

export default TopBar
