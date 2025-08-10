// assets
import enFlag from './flags/flag-usa.png'
import arabicFlag from './flags/flag.png'
import PopoverLayout from '../HeadlessUI/PopoverLayout'
import { useTranslation } from 'react-i18next'

interface LanguageData {
	id: string
	name: string
	flag: string
}

// get the languages and flags

const LanguageDropdown = () => {
	const { t, i18n } = useTranslation()
	const languages: LanguageData[] = [
		{
			id: 'en',
			name: t('english'),
			flag: enFlag
		},
		{
			id: 'ar',
			name: t('arabic'),
			flag: arabicFlag
		}
	]
	const currentLng = languages?.find(item => item?.id == i18n.language)
	const PopoverToggler = () => {
		return (
			<span className="flex items-center gap-2">
				<img src={currentLng?.flag} alt="flag-image" className="h-4" />
				<div className="lg:block hidden">
					<span className="capitalize text-md font-medium">{currentLng?.name}</span>&nbsp;
					<i className="ri-arrow-down-s-line"></i>
				</div>
			</span>
		)
	}

	return (
		<PopoverLayout placement="bottom-end" togglerClass="nav-link p-2" toggler={<PopoverToggler />}>
			<div className="absolute end-0 w-40 mt-1 z-50 transition-all duration-300 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg py-2">
				{languages?.map((lang, idx) => (
					<div
						key={idx}
						id={lang?.id}
						onClick={() => i18n.changeLanguage(lang?.id)}
						className="cursor-pointer flex items-center gap-2.5 py-2 px-3 text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
					>
						<img src={lang.flag} alt="user-image" className="h-4" />
						<span className="align-middle capitalize text-md font-medium">{lang.name}</span>
					</div>
				))}
			</div>
		</PopoverLayout>
	)
}

export default LanguageDropdown
