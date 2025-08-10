import { FormInput } from '@/components'
import CustomSelect from '@/components/ui/custom-select'
import { Loading } from '@/components/ui/Loading'
import { Button } from '@/components/ui/button'
import TextEditor from '@/components/ui/editor'
import { useCreateNotification } from './hooks'
import CustomSwitch from '@/components/ui/custom-switch'
import { useTranslation } from 'react-i18next'
import { Card, CardBody } from '@/components/ui/card'

const AddNotificationContent = () => {
	const { t } = useTranslation()
	const { createLoading, handleChange, handleCreateNotification, createData, users, users_types, handleEmailContentChange } = useCreateNotification()

	return (
		<Card>
			<CardBody>
				{createLoading && <Loading />}
				<form onSubmit={e => handleCreateNotification(e)}>
					<div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-5 mb-8 items-center">
						<FormInput value={createData?.title} onChange={e => handleChange('title', e.target.value)} label={t('title')} placeholder={t('enter_title')} />

						<div className="flex gap-5 items-center justify-center">
							<CustomSwitch label={t('send_to_all')} id={'send_to_all'} labelOff={t('off')} labelOn={t('on')} onChange={e => handleChange('send_to_all', e.target.checked)} />
							<CustomSwitch label={t('email')} id={'email'} labelOff={t('off')} labelOn={t('on')} onChange={e => handleChange('email', e.target.checked ? 1 : 0)} />
							<CustomSwitch label={t('system')} id={'system'} labelOff={t('off')} labelOn={t('on')} onChange={e => handleChange('system', e.target.checked ? 1 : 0)} />
						</div>

						{(createData?.system == 1 || createData?.send_to_all) && (
							<div className="col-span-1 lg:col-span-2">
								<FormInput
									value={createData?.notification_content}
									onChange={e => handleChange('notification_content', e.target.value)}
									label={t('notification_content')}
									type="textarea"
									rows={4}
									placeholder={t('enter_content')}
								/>
							</div>
						)}

						{createData?.email == 1 && (
							<div className="col-span-1 lg:col-span-2">
								<label className="font-semibold text-gray-500 capitalize">{t('email_content')}</label>
								<TextEditor onChange={handleEmailContentChange} />
							</div>
						)}

						{!createData?.send_to_all && (
							<>
								<CustomSelect
									label={t('user_type')}
									options={users_types}
									value={createData?.user_type}
									onChange={(e: any) => handleChange('user_type', e)}
									placeholder={t('select_type')}
									isClearable={true}
									optionLabel={'name'}
									optionValue={'id'}
								/>
								<CustomSelect
									label={t('user')}
									isMulti
									options={users}
									value={createData?.user_ids}
									onChange={(e: any) => handleChange('user_ids', e)}
									placeholder={t('select_user')}
									isClearable={true}
									optionLabel={'full_name'}
									optionValue={'id'}
								/>
							</>
						)}
					</div>
					<div className="my-5 flex gap-3">
						<Button variant="primary" type="submit">
							{t('save')}
						</Button>
					</div>
				</form>
			</CardBody>
		</Card>
	)
}

export default AddNotificationContent
