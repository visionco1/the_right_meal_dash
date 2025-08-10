import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	LayoutTheme,
	LayoutDirection,
	LayoutWidth,
	TopBarTheme,
	SideBarTheme,
	SideBarType,
	LayoutPosition
} from '../../../constants/layout'
import { getLayoutConfigs } from '../../../utils/layout'

interface LayoutStateTypes {
	layoutTheme: LayoutTheme.THEME_LIGHT | LayoutTheme.THEME_DARK
	layoutDirection: LayoutDirection.LEFT_TO_RIGHT | LayoutDirection.RIGHT_TO_LEFT
	layoutWidth: LayoutWidth.LAYOUT_WIDTH_FLUID | LayoutWidth.LAYOUT_WIDTH_BOXED
	topBarTheme: TopBarTheme.TOPBAR_LIGHT | TopBarTheme.TOPBAR_DARK | TopBarTheme.TOPBAR_BRAND
	sideBarTheme:
		| SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT
		| SideBarTheme.LEFT_SIDEBAR_THEME_DARK
		| SideBarTheme.LEFT_SIDEBAR_THEME_BRAND
	sideBarType:
		| SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT
		| SideBarType.LEFT_SIDEBAR_TYPE_HOVER
		| SideBarType.LEFT_SIDEBAR_TYPE_HOVERACTIVE
		| SideBarType.LEFT_SIDEBAR_TYPE_SMALL
		| SideBarType.LEFT_SIDEBAR_TYPE_COMPACT
		| SideBarType.LEFT_SIDEBAR_TYPE_MOBILE
		| SideBarType.LEFT_SIDEBAR_TYPE_HIDDEN
	layoutPosition: LayoutPosition.POSITION_FIXED | LayoutPosition.POSITION_SCROLLABLE
	isOpenRightSideBar: boolean
}

// Initial state based on URL search params
const initialState: LayoutStateTypes = (() => {
	const urlSearchParams = new URLSearchParams(window.location.search)
	const params = Object.fromEntries(urlSearchParams.entries())
	return {
		layoutTheme:
			params['layout_theme'] === 'dark' ? LayoutTheme.THEME_DARK : LayoutTheme.THEME_LIGHT,
		layoutDirection:
			params['dir'] === 'rtl' ? LayoutDirection.RIGHT_TO_LEFT : LayoutDirection.LEFT_TO_RIGHT,
		layoutWidth: LayoutWidth.LAYOUT_WIDTH_FLUID,
		sideBarType: SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT,
		sideBarTheme: SideBarTheme.LEFT_SIDEBAR_THEME_DARK,
		topBarTheme: TopBarTheme.TOPBAR_LIGHT,
		layoutPosition: LayoutPosition.POSITION_FIXED,
		isOpenRightSideBar: false
	}
})()

// Create the slice
const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		changeLayoutTheme: (state, action: PayloadAction<LayoutTheme>) => {
			state.layoutTheme = action.payload
		},
		changeLayoutDirection: (state, action: PayloadAction<LayoutDirection>) => {
			state.layoutDirection = action.payload
		},
		changeLayoutWidth: (state, action: PayloadAction<LayoutWidth>) => {
			const layoutConfig = getLayoutConfigs(action.payload)
			state.layoutWidth = action.payload
			Object.assign(state, layoutConfig)
		},
		changeTopBarTheme: (state, action: PayloadAction<TopBarTheme>) => {
			state.topBarTheme = action.payload
		},
		changeSideBarTheme: (state, action: PayloadAction<SideBarTheme>) => {
			state.sideBarTheme = action.payload
		},
		changeSideBarType: (state, action: PayloadAction<SideBarType>) => {
			state.sideBarType = action.payload
		},
		changeLayoutPosition: (state, action: PayloadAction<LayoutPosition>) => {
			state.layoutPosition = action.payload
		},
		showRightSidebar: state => {
			state.isOpenRightSideBar = true
		},
		hideRightSidebar: state => {
			state.isOpenRightSideBar = false
		}
	}
})

// Export actions
export const {
	changeLayoutTheme,
	changeLayoutDirection,
	changeLayoutWidth,
	changeTopBarTheme,
	changeSideBarTheme,
	changeSideBarType,
	changeLayoutPosition,
	showRightSidebar,
	hideRightSidebar
} = layoutSlice.actions

// Export the reducer
export const layoutReducer = layoutSlice.reducer
