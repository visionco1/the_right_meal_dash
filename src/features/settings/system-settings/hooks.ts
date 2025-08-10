import { useFetchData, useUpdate } from '@/hooks'
import { getSettings, setAddressInfo } from '@/redux/slices/settings/settings'
import { RootState } from '@/redux/store'
import { handleChangeState, hasPermissions } from '@/helpers/helpers'
import { updateSettingsApi } from '@/features/settings/system-settings/api'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'

export const useUpdateSettings = () => {
	const selector = (state: RootState) => state.settingsReducer
	const { addressInfo } = useSelector(selector)
	const dispatch = useDispatch()
	// update
	const { updateLoading, handleUpdateData, handleUpdate } = useUpdate({
		updateApi: updateSettingsApi,
		selector: selector,
		allAction: getSettings
	})
	// fetch data
	const { loading, error, data: settings } = useFetchData(getSettings, selector)

	useEffect(() => {
		if (!loading && data) {
			dispatch(setAddressInfo({ address: settings?.data?.location?.address, lat: settings?.data?.location?.lat, lng: settings?.data?.location?.lng }))
		}
	}, [loading, settings])

	// default values
	const values: any = useMemo(
		() => ({
			'name:ar': settings?.data?.name || '',
			'name:en': settings?.data?.name || '',
			'description:ar': settings?.data?.description || '',
			'description:en': settings?.data?.description || '',
			'our_vision:ar': settings?.data?.our_vision?.ar || '',
			'our_vision:en': settings?.data?.our_vision?.en || '',
			'our_mission:ar': settings?.data?.our_mission?.ar || '',
			'our_mission:en': settings?.data?.our_mission?.en || '',
			'our_tasks:ar': settings?.data?.our_tasks?.ar || '',
			'our_tasks:en': settings?.data?.our_tasks?.en || '',
			trade_register: settings?.data?.trade_register || '',
			tax_number: settings?.data?.tax_number || '',
			phone: settings?.data?.phone || '',
			mobile: settings?.data?.mobile || '',
			whats_app: settings?.data?.whats_app || '',
			email: settings?.data?.email || '',
			location: settings?.data?.location?.address || '',
			facebook: settings?.data?.social?.facebook || '',
			linkedin: settings?.data?.social?.linkedin || '',
			twitter: settings?.data?.social?.twitter || '',
			instagram: settings?.data?.social?.instagram || '',
			youtube: settings?.data?.social?.youtube || '',
			whatsapp: settings?.data?.social?.whatsapp || '',
			snapchat: settings?.data?.social?.snapchat || '',
			tiktok: settings?.data?.social?.tiktok || '',
			'privacy_content:en': settings?.data?.privacy?.en || '',
			'privacy_content:ar': settings?.data?.privacy?.ar || '',
			'terms_content:en': settings?.data?.terms?.en || '',
			'terms_content:ar': settings?.data?.terms?.ar || '',
			'about_us:en': settings?.data?.about_us?.en || '',
			'about_us:ar': settings?.data?.about_us?.ar || '',
			facebook_pixel: settings?.data?.seo?.facebook_pixel || '',
			tiktok_pixel: settings?.data?.seo?.tiktok_pixel || '',
			snapchat_pixel: settings?.data?.seo?.snapchat_pixel || '',
			google_ads_pixel: settings?.data?.seo?.google_ads_pixel || '',
			google_analytics: settings?.data?.seo?.google_analytics || '',
			google_tag_manager_pixel: settings?.data?.seo?.google_tag_manager_pixel || '',
			logo: null,
			favicon: null,
			loginLogo: null,
			footerBackground: null,
			footerLogo: null,
			siteLogo: null,
			hero: null
		}),
		[settings, loading]
	)
	const [data, setData] = useState(values)
	const handleChange = (key: string, value: string) => {
		handleChangeState(setData, data, key, value)
	}
	useEffect(() => {
		if (!loading) {
			setData(values)
		}
	}, [settings, loading])

	// handle update settings
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (values && data) {
			handleUpdateData({ ...data, ...addressInfo }, values)
		}
	}

	const permission = (type: string) => {
		return hasPermissions(settings?.data?.permissions, type)
	}

	return {
		handleSubmit,
		permission,
		loading,
		error,
		updateLoading,
		data,
		handleChange,
		settings
	}
}
