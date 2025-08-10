export interface MenuItemTypes {
	key: string
	label: string
	isTitle?: boolean
	icon?: any
	url?: string
	permission?: Permission | Permission[]
	badge?: {
		variant: string
		text: string
	}
	parentKey?: string
	target?: string
	children?: MenuItemTypes[]
}

const MENU_ITEMS: MenuItemTypes[] = [
	{
		key: 'dashboard',
		label: 'dashboard',
		icon: 'ri-home-4-line',
		url: '/home'
	},
	{
		key: 'staff-management',
		label: 'staff_management',
		icon: 'ri-user-settings-fill',
		permission: ['index_admins', 'index_roles'],
		children: [
			{
				key: 'roles',
				label: 'roles',
				url: '/staff-management/roles',
				parentKey: 'staff-management',
				permission: 'index_roles'
			},
			{
				key: 'staff',
				label: 'staff',
				url: '/staff-management/staff',
				parentKey: 'staff-management',
				permission: 'index_admins'
			}
		]
	},
	{
		key: 'menu-management',
		label: 'menu_management',
		icon: 'ri-menu-line',
		permission: ['index_menus', 'index_allergens', 'index_meal_categories', 'index_meals', 'index_nutrition_facts', 'index_sizes'],
		children: [
			{
				key: 'index_allergens',
				label: 'allergens',
				url: '/menu-management/allergens',
				permission: 'index_allergens',
				parentKey: 'menu-management'
			},
			{
				key: 'sizes',
				label: 'sizes',
				url: '/menu-management/sizes',
				permission: 'index_sizes',
				parentKey: 'menu-management'
			},
			{
				key: 'index_meal_categories',
				label: 'meal_categories',
				url: '/menu-management/meal-categories',
				permission: 'index_meal_categories',
				parentKey: 'menu-management'
			},
			{
				key: 'index_meals',
				label: 'meals',
				url: '/menu-management/meals',
				permission: 'index_meals',
				parentKey: 'menu-management'
			},
			{
				key: 'menu',
				label: 'menu',
				url: '/menu-management/menu',
				permission: 'index_menus',
				parentKey: 'menu-management'
			},
			{
				key: 'nutrition-facts',
				label: 'nutrition_facts',
				url: '/menu-management/nutrition-facts',
				permission: 'index_nutrition_facts',
				parentKey: 'menu-management'
			}
		]
	},
	{
		key: 'plans-management',
		label: 'plans_management',
		icon: 'ri-billiards-line',
		permission: ['index_plan_categories', 'index_plans'],
		children: [
			{
				key: 'plan-categories',
				label: 'plan_categories',
				url: '/plans-management/plan-categories',
				parentKey: 'plans-management',
				permission: 'index_plan_categories'
			},
			{
				key: 'plans',
				label: 'plans',
				url: '/plans-management/plans',
				parentKey: 'plans-management',
				permission: 'index_plans'
			}
		]
	},
	{
		key: 'customers-management',
		label: 'customers_management',
		icon: 'ri-customer-service-fill',
		permission: ['index_users', 'index_subscriptions'],
		children: [
			{
				key: 'customers',
				label: 'customers',
				url: '/customers-management/customers',
				parentKey: 'customers-management',
				permission: 'index_users'
			},
			{
				key: 'subscriptions',
				label: 'subscriptions',
				url: '/customers-management/subscriptions',
				parentKey: 'customers-management',
				permission: 'index_subscriptions'
			},
			{
				key: 'orders',
				label: 'orders',
				url: '/customers-management/orders',
				parentKey: 'customers-management',
				permission: 'index_orders'
			},
			{
				key: 'orders-complaints',
				label: 'orders_complaints',
				url: '/customers-management/orders-complaints',
				parentKey: 'customers-management',
				permission: 'index_complaints'
			}
		]
	},
	{
		key: 'wallet-management',
		label: 'wallet_management',
		icon: 'ri-wallet-line',
		permission: 'index_wallets',
		children: [
			{
				key: 'wallet',
				label: 'wallet',
				url: '/wallet-management/wallet',
				parentKey: 'wallet-management',
				permission: 'index_wallets'
			}
		]
	},
	{
		key: 'reports-management',
		label: 'reports',
		icon: 'ri-bill-fill',
		permission: 'index_orders',
		children: [
			{
				key: 'reports',
				label: 'packaging_report',
				url: '/reports/packaging-report',
				parentKey: 'reports-management',
				permission: 'index_orders'
			}
		]
	},
	{
		key: 'delivery-management',
		label: 'delivery_management',
		icon: 'ri-truck-fill',
		permission: ['index_deliveries', 'index_zones', 'index_shifts'],
		children: [
			{
				key: 'delivery-periods',
				label: 'delivery_periods',
				url: '/delivery-management/delivery-periods',
				permission: 'index_shifts',
				parentKey: 'delivery-management'
			},
			{
				key: 'zones',
				label: 'zones',
				url: '/delivery-management/zones',
				permission: 'index_zones',
				parentKey: 'delivery-management'
			},
			{
				key: 'delivery-men',
				label: 'delivery_men',
				url: '/delivery-management/delivery-men',
				permission: 'index_deliveries',
				parentKey: 'delivery-management'
			},
			{
				key: 'quality-control',
				label: 'quality control',
				url: '/delivery-management/quality-control',
				permission: 'index_qualities',
				parentKey: 'delivery-management'
			},
			{
				key: 'outlets',
				label: 'outlets',
				url: '/delivery-management/outlets',
				permission: 'index_outlets',
				parentKey: 'delivery-management'
			}
		]
	},
	{
		key: 'stock-orders-management',
		label: 'stock_orders_management',
		icon: 'ri-bill-line',
		permission: 'index_stock_orders',
		children: [
			{
				key: 'items',
				label: 'items',
				url: '/stock-orders-management/items',
				parentKey: 'stock-orders-management',
				permission: 'index_stock_orders'
			},
			{
				key: 'stock-orders',
				label: 'stock_orders',
				url: '/stock-orders-management/stock-orders',
				parentKey: 'stock-orders-management',
				permission: 'index_stock_orders'
			}
		]
	},
	{
		key: 'marketing-management',
		label: 'marketing_management',
		icon: 'ri-store-line',
		permission: ['index_coupones', 'index_banners', 'index_subscribers', 'index_contact-us', 'index_notifications'],
		children: [
			{
				key: 'notifications-newsLetters',
				label: 'notifications_newsletters',
				url: '/marketing-management/notifications',
				parentKey: 'marketing-management',
				permission: 'index_notifications'
			},
			{
				key: 'coupons',
				label: 'coupons',
				url: '/marketing-management/coupons',
				parentKey: 'marketing-management',
				permission: 'index_coupones'
			},
			{
				key: 'subscribers',
				label: 'subscribers',
				url: '/marketing-management/subscribers',
				parentKey: 'marketing-management',
				permission: 'index_subscribers'
			},
			{
				key: 'banners',
				label: 'banners',
				url: '/marketing-management/banners',
				parentKey: 'marketing-management',
				permission: 'index_banners'
			},
			{
				key: 'contact-us',
				label: 'contact_us',
				url: '/marketing-management/contact-us',
				parentKey: 'marketing-management',
				permission: 'index_contact-us'
			}
		]
	},
	{
		key: 'settings',
		label: 'settings',
		icon: 'ri-settings-5-fill',
		permission: ['index_settings', 'index_countries', 'index_branches', 'index_whyuses'],
		children: [
			{
				key: 'countries',
				label: 'countries',
				url: '/settings/countries',
				permission: 'index_countries',
				parentKey: 'settings'
			},
			{
				key: 'branches',
				label: 'branches',
				url: '/settings/branches',
				permission: 'index_branches',
				parentKey: 'settings'
			},
			{
				key: 'system-settings',
				label: 'system_settings',
				url: '/settings/system-settings',
				permission: 'index_settings',
				parentKey: 'settings'
			},
			{
				key: 'why-us',
				label: 'why_us',
				url: '/settings/why-us',
				permission: 'index_whyuses',
				parentKey: 'settings'
			}
		]
	}
]

export { MENU_ITEMS }
