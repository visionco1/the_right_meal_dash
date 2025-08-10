import React, { ReactNode, Suspense, useEffect } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import * as layoutConstants from '../constants/layout'

// hooks
import { useViewPort } from '../hooks'
import { changeHTMLAttribute } from '../utils'
import { Preloader } from '../components'
import { changeSideBarType } from '@/redux/slices/layout/layout'

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52

const TopBar = React.lazy(() => import('./Topbar'))
const LeftSideBar = React.lazy(() => import('./LeftSideBar'))
const Footer = React.lazy(() => import('./Footer'))
const RightSideBar = React.lazy(() => import('./RightSideBar'))

const loading = () => <div />

interface VerticalLayoutProps {
	children?: ReactNode
}

const VerticalLayout = ({ children }: VerticalLayoutProps) => {
	const dispatch = useDispatch<AppDispatch>()
	const { width } = useViewPort()

	const { layoutTheme, layoutDirection, layoutWidth, topBarTheme, sideBarTheme, sideBarType, layoutPosition } = useSelector((state: RootState) => ({
		layoutType: state.layoutReducer.layoutType,
		layoutDirection: state.layoutReducer.layoutDirection,
		layoutTheme: state.layoutReducer.layoutTheme,
		layoutWidth: state.layoutReducer.layoutWidth,
		topBarTheme: state.layoutReducer.topBarTheme,
		sideBarTheme: state.layoutReducer.sideBarTheme,
		sideBarType: state.layoutReducer.sideBarType,
		layoutPosition: state.layoutReducer.layoutPosition,
		isOpenRightSideBar: state.layoutReducer.isOpenRightSideBar
	}))

	//Layout defaults
	useEffect(() => {
		changeHTMLAttribute('data-mode', layoutTheme)
	}, [layoutTheme])

	useEffect(() => {
		changeHTMLAttribute('dir', layoutDirection)
	}, [layoutDirection])

	useEffect(() => {
		changeHTMLAttribute('data-layout-width', layoutWidth)
	}, [layoutWidth])

	useEffect(() => {
		changeHTMLAttribute('data-topbar-color', topBarTheme)
	}, [topBarTheme])

	useEffect(() => {
		changeHTMLAttribute('data-menu-color', sideBarTheme)
	}, [sideBarTheme])

	useEffect(() => {
		changeHTMLAttribute('data-sidenav-view', sideBarType)
	}, [sideBarType])

	useEffect(() => {
		changeHTMLAttribute('data-layout-position', layoutPosition)
	}, [layoutPosition])

	useEffect(() => {
		document.getElementsByTagName('html')[0].removeAttribute('data-layout')
	}, [])

	useEffect(() => {
		if (width < 768) {
			dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_MOBILE))
		} else if (width < 1140) {
			dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_SMALL))
		} else if (width >= 1140) {
			dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT))
		}
	}, [width, dispatch])

	const isCondensed = sideBarType === layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_SMALL
	const isLight = sideBarTheme === layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT

	return (
		<>
			<Suspense fallback={loading()}>
				<div className="flex wrapper">
					<Suspense fallback={loading()}>
						<LeftSideBar isCondensed={isCondensed} isLight={isLight} hideUserProfile={true} />
					</Suspense>

					<div className="page-content">
						<Suspense fallback={loading()}>
							<TopBar />
						</Suspense>

						<main className="p-6">
							<Suspense fallback={<Preloader />}>{children}</Suspense>
						</main>

						<Footer />
					</div>
				</div>

				<Suspense fallback={loading()}>
					<RightSideBar />
				</Suspense>
			</Suspense>
		</>
	)
}

export default VerticalLayout
