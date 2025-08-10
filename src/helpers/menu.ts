import { MENU_ITEMS, MenuItemTypes } from '../constants/menu'
import { APICore } from './api/apiCore'
import { hasPermissions } from './helpers'

// this function to remove any boolean value inside the menu item even inside the child
const getMenuItems = () => {
	// Helper function to recursively remove boolean values
	const removeBooleans = (item: any): any => {
		if (Array.isArray(item)) {
			// If item is an array, recursively filter each element
			return item.filter(subItem => typeof subItem !== 'boolean').map(removeBooleans)
		} else if (typeof item === 'object' && item !== null) {
			// If item is an object, recursively process its properties
			const newItem: any = {}
			Object.keys(item).forEach((key: any) => {
				const value = item[key]
				if (typeof value !== 'boolean') {
					newItem[key] = removeBooleans(value)
				}
			})
			return newItem
		}
		// Otherwise, return the item as is (it's neither an object nor an array)
		return item
	}

	// Remove booleans from the MENU_ITEMS
	const filteredItems = MENU_ITEMS.filter((item: any) => typeof item !== 'boolean').map(removeBooleans)

	return filteredItems
}

// helper to filter the menu items by permissions
export function filterMenuByPermissions(menu: MenuItemTypes[]): MenuItemTypes[] {
	const Api = new APICore()
	const permissions = Api?.getLoggedInUser()?.permissions
	return menu
		.map(item => {
			const itemPerms = item.permission
			const hasAccess = !itemPerms || (Array.isArray(itemPerms) ? itemPerms.some(p => hasPermissions(permissions, p)) : hasPermissions(permissions, itemPerms))

			if (!hasAccess) return null

			const children = item.children ? filterMenuByPermissions(item.children) : undefined

			return {
				...item,
				children
			}
		})
		.filter(Boolean) as MenuItemTypes[]
}

const findAllParent = (menuItems: MenuItemTypes[], menuItem: MenuItemTypes): string[] => {
	let parents: string[] = []
	const parent = findMenuItem(menuItems, menuItem.parentKey)

	if (parent) {
		parents.push(parent.key)
		if (parent.parentKey) {
			parents = [...parents, ...findAllParent(menuItems, parent)]
		}
	}
	return parents
}

const findMenuItem = (menuItems: MenuItemTypes[] | undefined, menuItemKey: MenuItemTypes['key'] | undefined): MenuItemTypes | null => {
	if (menuItems && menuItemKey) {
		for (let i = 0; i < menuItems.length; i++) {
			if (menuItems[i].key === menuItemKey) {
				return menuItems[i]
			}
			const found = findMenuItem(menuItems[i].children, menuItemKey)
			if (found) return found
		}
	}
	return null
}

export { getMenuItems, findAllParent, findMenuItem }
