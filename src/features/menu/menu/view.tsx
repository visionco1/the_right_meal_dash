import { useParams } from 'react-router-dom'
import { useMenuHook } from './hooks'
import { Button } from '@/components/ui/button'
import ContentWrapper from '@/components/ui/content-wrapper'
import PersistentTabs from './tabs'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'

const ViewMenuContent = () => {
	const { t } = useTranslation()
	const { id } = useParams()
	const { permission } = useMenuHook()

	if (!permission('show')) return
	return (
		<Card>
			<CardHeader>
				<Button href={`/menu-management/menu/edit/${id}`}>{t('edit_menu')}</Button>
			</CardHeader>
			<ContentWrapper>
				<PersistentTabs />
			</ContentWrapper>
		</Card>
	)
}

export default ViewMenuContent
