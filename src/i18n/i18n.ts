import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Axios from '@/helpers/api/Axios'

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.use(LanguageDetector)
	.use(HttpApi)
	.init({
		// lng: 'ar',
		fallbackLng: 'en',
		supportedLngs: ['en', 'ar'],
		defaultNS: 'translation',
		detection: {
			order: ['cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
			// cache user language on
			caches: ['localStorage', 'cookie']
		},
		backend: {
			loadPath: '/Locale/{{lng}}/{{ns}}.json'
		}
	})
export default i18n

export function useSetLang() {
	const { i18n } = useTranslation()

	useEffect(() => {
		const lang = i18n.language || 'en'
		const dir = lang == 'ar' ? 'rtl' : 'ltr'

		document.documentElement.lang = lang
		document.documentElement.dir = dir
		Axios.defaults.headers.common['Accept-Language'] = i18n.language
	}, [i18n.language])
	useEffect(() => {
		const lang = i18n.language || 'en'
		const dir = lang == 'ar' ? 'rtl' : 'ltr'

		document.documentElement.lang = lang
		document.documentElement.dir = dir
		Axios.defaults.headers.common['Accept-Language'] = i18n.language
	}, [])
}
