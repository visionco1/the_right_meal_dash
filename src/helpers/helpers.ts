import { AppDispatch } from '@/redux/store'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
type KeyValueBuilder<T> = (item: T, index: number) => Record<string, any>

export const isFunction = (functionToCheck: any): functionToCheck is Function => {
	return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}
export const formDataToObject = (formData: FormData) => {
	const formDataObj: { [key: string]: any } = {}
	formData.forEach((value, key) => {
		formDataObj[key] = value
	})
	return formDataObj
}

export const autoDownloadFile = (url: string, name?: string) => {
	if (!document || !url) return

	const link = document.createElement('a')
	link.href = url
	link.download = name ?? ''
	link.style.display = 'none'

	document.body.appendChild(link)
	link.click()

	document.body.removeChild(link)
}

export const getUrlUpToPage = (endPage: string): string | undefined => {
	// Check if running in a browser environment
	if (typeof window !== 'undefined') {
		const pathname = window.location.pathname

		// Find the index of the endPage in the pathname
		const endPageIndex = pathname.indexOf(endPage)

		if (endPageIndex !== -1) {
			// Return the full URL up to and including the endPage
			return pathname.slice(0, endPageIndex + endPage.length)
		}

		// If endPage is not found, return the full pathname
		return pathname
	}

	// Return undefined if not in a browser environment
	return ''
}

export const hasPermissions = (permissions: string[], requiredPermission: string): boolean => {
	return permissions?.includes(requiredPermission)
}

export const urlToFile = async (url: string, fileName: string) => {
	// Fetch the image from the URL
	const response = await fetch(url)
	const blob = await response.blob()

	// Create a File object from the blob
	const file = new File([blob], fileName, { type: blob.type })

	return file
}
// start state helpers
export const handleChangeState = (setData: React.Dispatch<React.SetStateAction<any>>, prevState: any, key: string, value: any) => {
	setData({
		...prevState,
		[key]: value
	})
}
export const handleDeleteFromState = (setData: React.Dispatch<React.SetStateAction<any>>, prevState: any, key: string, index: number) => {
	const newSections = prevState?.meal_outlet_prices.filter((item: any, i: number) => i !== index)
	handleChangeState(setData, prevState, key, newSections)
}
export const resetState = <T extends object>(template: T, setState: React.Dispatch<React.SetStateAction<T>>): void => {
	const emptyState = Object.fromEntries(Object.entries(template).map(([key, value]) => [key, getEmptyValue(value)])) as T
	setState(emptyState)
}
const getEmptyValue = (value: any): any => {
	if (typeof value === 'string') return ''
	if (typeof value === 'number') return 0
	if (typeof value === 'boolean') return false
	if (Array.isArray(value)) return []
	return null
}
// end state helpers
export const useRenderOneTime = (params: any, action: any, data: any, cached = false) => {
	const dispatch = useDispatch<AppDispatch>()
	const hasRun = useRef(false)
	useEffect(() => {
		// if(cached && data?.data?.data?.length){
		//  return
		// }else{
		// }
		if (!hasRun.current) {
			dispatch(action(params || {}))
			hasRun.current = true
		}
	}, [params, dispatch, action])
}

export const removeTrailingZeros = (time: string): string => {
	// Split the time string into hours, minutes, and seconds
	const timeParts = time.split(':')

	// Remove any part that is '00'
	const cleanedTimeParts = timeParts.filter(part => part !== '00')

	// Join the remaining parts back with ':'
	return cleanedTimeParts.join(':')
}

export const filterUpdatedFiles = (data: any, values: any, fileFields: string[]): any => {
	const updatedData: any = { ...data }

	fileFields.forEach(key => {
		const newValue = data[key]?.[0]
		const isFile = newValue instanceof File

		if (isFile && newValue !== values[key]) {
			updatedData[key] = newValue
		} else {
			delete updatedData[key]
		}
	})

	return updatedData
}

export const filterUpdatedData = (data: any, values: any, fileFields?: string[]): any => {
	const updatedData: any = { ...data }
	// const fileFieldsArr = ['footerBackground', 'siteLogo', 'footerLogo', 'logo', 'loginLogo', 'favicon', 'avatar', 'image', 'photo', 'hero', ...(fileFields || '')]

	// fileFieldsArr?.forEach(key => {
	// 	const newValue = data[key]?.[0]
	// 	const isFile = newValue instanceof File

	// 	if (isFile && newValue != values[key]) {
	// 		updatedData[key] = newValue
	// 	} else {
	// 		delete updatedData[key]
	// 	}
	// })
	const differences: Record<string, any> = {}

	for (const [key, value] of Object.entries(updatedData)) {
		// Skip if value is an empty string
		if (value == '') continue

		if (!values || values[key] === undefined) {
			differences[key] = value
			continue
		}

		if (values[key] != value || Array.isArray(values[key])) {
			differences[key] = value
		}
	}

	return differences
}

export function arrayToBracketedObject<T extends Record<string, any>>(
	array: T[] | undefined,
	keyPrefix: string,
	keys: (keyof T | string)[] = ['id'],
	flatten = false // new option to flatten the keys
): Record<string, any> {
	if (!Array.isArray(array)) return {}

	return array.reduce((acc: Record<string, any>, item, index) => {
		if (flatten) {
			// If flatten is true, just assign the whole item to keyPrefix[index]
			acc[`${keyPrefix}[${index}]`] = item['id']
		} else {
			// Else, use the detailed keys
			keys.forEach((key: any) => {
				acc[`${keyPrefix}[${index}][${key}]`] = item[key]
			})
		}
		return acc
	}, {})
}

export function flattenArrayToBracketedObject<T>(array: T[] | undefined, keyPrefix: string, builder: KeyValueBuilder<T>): Record<string, any> {
	if (!Array.isArray(array)) return {}
	return array?.reduce((acc: Record<string, any>, item, index) => {
		const keyValues = builder(item, index)
		for (const [key, value] of Object.entries(keyValues)) {
			acc[`${keyPrefix}[${index}]${key ? `[${key}]` : ''}`] = value
		}
		return acc
	}, {})
}

export const dateHelper = {
	now: () => new Date(),

	getToday: () => {
		const today = new Date()
		const year = today.getFullYear()
		const month = String(today.getMonth() + 1).padStart(2, '0')
		const day = String(today.getDate()).padStart(2, '0')

		// return `${day}-${month}-${year}`
		return `${year}-${month}-${day}`
	},

	format: (date = new Date(), locale = 'en-US', options = {}) =>
		date.toLocaleDateString(locale, {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			...options
		}),

	formatTime: (date = new Date(), locale = 'en-US', options = {}) =>
		date.toLocaleTimeString(locale, {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			...options
		}),

	addDays: (date = new Date(), days = 1) => {
		const result = new Date(date)
		result.setDate(result.getDate() + days)
		return result
	},

	subtractDays: (date = new Date(), days = 1) => {
		return dateHelper.addDays(date, -days)
	},

	toISO: (date = new Date()) => date.toISOString(),

	fromISO: (isoString: string) => new Date(isoString),

	isToday: (date = new Date()) => {
		const todayStr = dateHelper.getToday()
		const inputDate = new Date(date)
		const inputStr = `${inputDate.getFullYear()}-${String(inputDate.getMonth() + 1).padStart(2, '0')}-${String(inputDate.getDate()).padStart(2, '0')}`
		return inputStr === todayStr
	},

	daysBetween: (startDate: any, endDate: any) => {
		const msPerDay = 24 * 60 * 60 * 1000
		const diff = Math.abs(endDate - startDate)
		return Math.floor(diff / msPerDay)
	},

	formatISODate: (isoDateStr: string) => {
		const date = new Date(isoDateStr)
		return date.toLocaleString('en-US', {
			timeZone: 'UTC',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		})
	}
}
export const formatTime = (time: string): string => {
	if (!time) return ''
	const [hourStr, minute] = time.split(':')
	let hour = parseInt(hourStr, 10)
	const ampm = hour >= 12 ? 'PM' : 'AM'
	hour = hour % 12 || 12
	return `${hour}:${minute} ${ampm}`
}
export function filterExcludedKeys(obj: any, excludedKeys: string[] = []) {
	return Object.fromEntries(Object.entries(obj).filter(([key]) => !excludedKeys.includes(key)))
}

export const ensureObject = (input: any) => {
	if (input && typeof input === 'object' && 'id' in input && 'name' in input) {
		return input
	}

	if (typeof input === 'string' || typeof input === 'number') {
		return { id: input, name: String(input) }
	}

	return { id: '', name: '' }
}
// filter empty keys
export const filterEmptyKeys = (data: any) => {
	const filteredData: Record<string, any> = {}
	for (const [key, value] of Object.entries(data)) {
		if (data[key] != undefined && data[key] != '') {
			filteredData[key] = value
			continue
		}
	}
	return filteredData
}

const convertToBracketNotation = (data: any, root = ''): any => {
	const result: any = {}

	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			const value = data[key]
			const formKey = root ? `${root}[${key}]` : key

			if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof File)) {
				const nestedResult = convertToBracketNotation(value, formKey)
				Object.assign(result, nestedResult)
			} else {
				result[formKey] = value
			}
		}
	}

	return result
}

export const appendFormData = (formData: FormData, data: any) => {
	const convertedData = convertToBracketNotation(data)

	for (const key in convertedData) {
		if (convertedData.hasOwnProperty(key) && convertedData?.[key]) {
			formData.append(key, convertedData[key])
		}
	}
}

export const appendFormDataNestedArrays = (formData: FormData, data: any, clearEmptyValue?: boolean) => {
	const convertedData = convertToBracketNotation(data)

	for (const key in convertedData) {
		if (clearEmptyValue && !convertedData?.[key]) continue

		if (convertedData.hasOwnProperty(key)) {
			if (Array.isArray(convertedData[key])) {
				convertedData[key].forEach((value: any, i: number) => {
					formData.append(`${key}[${i}]`, value)
				})
			} else {
				formData.append(key, convertedData[key])
			}
		}
	}
}

export const convertToFormData = (data: any, formData = new FormData(), parentKey = '') => {
	if (data == null || data == undefined) return formData

	if (Array.isArray(data)) {
		data.forEach((value, index) => {
			const key = parentKey ? `${parentKey}[${index}]` : `${index}`
			convertToFormData(value, formData, key)
		})
	} else if (typeof data === 'object' && !(data instanceof File)) {
		Object.keys(data).forEach(key => {
			const value = data[key]
			const fullKey = parentKey ? `${parentKey}[${key}]` : key
			convertToFormData(value, formData, fullKey)
		})
	} else {
		if (data !== '') {
			formData.append(parentKey, data)
		}
	}
	const ResultFormData: any = {}
	formData?.forEach((value, key) => {
		ResultFormData[key] = value
	})
	return ResultFormData
}

export const setSelect = (data: any, check: any, key = 'id', isOneSetFirst = false) => {
	if (data?.length > 0) {
		if (isOneSetFirst && data?.length == 1) return data ?? []
		else return check ? data?.filter((item: any) => check == item?.[key]) : []
	} else return []
}

export const setMultiSelect = (data: any, check: any[], key = 'id', isOneSetFirst = false) => {
	if (data?.length > 0) {
		if (isOneSetFirst && data?.length == 1) return data ?? []
		else return check ? data?.filter((item: any) => check?.some(check => check == item?.[key])) : []
	} else return []
}
