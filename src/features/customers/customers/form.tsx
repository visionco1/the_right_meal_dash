import { FormInput } from '@/components'
import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
// import ProfileImageUpload from '@/components/ui/profile-image-upload'

type TProps = {
	handleSubmit: (data: any) => void
	setOpenModal: Dispatch<SetStateAction<boolean>>
	data?: any
	handleChange: (key: string, value: any) => void
	showResponse?: any
}
const UserForm = ({ handleSubmit, handleChange, data, setOpenModal, showResponse }: TProps) => {
	const { t } = useTranslation()
	return (
		<form onSubmit={handleSubmit}>
			<div className="h-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-3 items-center">
					{/* <ProfileImageUpload url={showResponse?.data?.avatar?.url} onChange={e => handleChange('avatar', e)} className="mb-5 col-span-2" /> */}
					<FormInput value={data?.f_name} onChange={e => handleChange('f_name', e.target.value)} label={t('first_name')} placeholder={t('first_name')} />

					<FormInput value={data?.l_name} onChange={e => handleChange('l_name', e.target.value)} label={t('last_name')} placeholder={t('last_name')} />

					<FormInput value={data?.email} onChange={e => handleChange('email', e.target.value)} label={t('email')} placeholder={t('email')} />

					<FormInput value={data?.phone} onChange={e => handleChange('phone', e.target.value)} label={t('phone')} placeholder={t('phone')} />

					<FormInput value={data?.password} onChange={e => handleChange('password', e.target.value)} label={t('password')} placeholder={t('password')} type="password" />

					<FormInput
						value={data?.password_confirmation}
						onChange={e => handleChange('password_confirmation', e.target.value)}
						label={t('confirm_password')}
						placeholder={t('confirm_password')}
						type="password"
					/>
				</div>
				<div className="my-5 flex gap-2">
					<Button type="submit" variant="primary">
						{t('save')}
					</Button>
					<Button type="button" variant="light" onClick={() => setOpenModal(false)}>
						{t('cancel')}
					</Button>
				</div>
			</div>
		</form>
	)
}

export default UserForm
