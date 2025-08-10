import { useTranslation } from 'react-i18next'

const NoData = ({ value }: { value?: string }) => {
	const { t } = useTranslation()
	return <h3 className="w-full capitalize font-bold text-center bg-white p-4 my-2 mx-auto rounded-md ">{value || t('no_data')}</h3>
}

export default NoData
