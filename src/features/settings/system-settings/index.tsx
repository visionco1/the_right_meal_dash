import { FormInput } from '@/components'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/ui/Loading'
import { useUpdateSettings } from './hooks'
import { Tab } from '@headlessui/react'
import MapWithAddress from '@/components/map/map-with-address'
import TextEditor from '@/components/ui/editor'
import { useTranslation } from 'react-i18next'
import { Card, CardBody } from '@/components/ui/card'
import ProfileImageUpload from '@/components/ui/profile-image-upload'

const Content = () => {
	const { t } = useTranslation()
	const { loading, updateLoading, data, handleSubmit, permission, handleChange, settings } = useUpdateSettings()

	return (
		<Card>
			<CardBody>
				{(updateLoading || loading) && <Loading />}
				{(permission('show') || permission('update')) && (
					<div className="p-6">
						<div className="pt-5">
							<form onSubmit={handleSubmit}>
								<Tab.Group>
									<div className="w-[calc(100vw-100px)] md:w-[calc(100vw-200px)] lg:w-[calc(100vw-500px)] overflow-auto my-5">
										<Tab.List as="nav" className="w-full relative z-0 flex border rounded-xl dark:border-gray-600 my-4">
											{['general', 'contacts', 'social', 'static_pages', 'seo', 'logos'].map(tab => (
												<Tab
													key={tab}
													type="button"
													className={({ selected }) =>
														`flex items-center justify-center !m-0 relative w-fit min-w-fit min-h-[50px] flex-1 bg-white first:border-l-0 border-l border-b-2 p-5 text-gray-500 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 dark:bg-gray-800 dark:border-l-gray-700 dark:border-b-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-400 ${
															selected ? 'border-b-primary text-gray-900 dark:text-white' : 'hover:bg-gray-50 hover:text-gray-700'
														}`
													}
												>
													{t(tab)}
												</Tab>
											))}
										</Tab.List>
									</div>
									<Tab.Panels>
										{/* General */}
										<Tab.Panel key="general">
											<div className="grid grid-cols-2 gap-6">
												<FormInput name="name:ar" label={t('name_ar')} value={data?.['name:ar']} onChange={e => handleChange('name:ar', e.target.value)} />
												<FormInput name="name:en" label={t('name_en')} value={data?.['name:en']} onChange={e => handleChange('name:en', e.target.value)} />
												<FormInput
													rows={4}
													type="textarea"
													name="description:ar"
													label={t('description_ar')}
													value={data?.['description:ar']}
													onChange={e => handleChange('description:ar', e.target.value)}
												/>
												<FormInput
													rows={4}
													type="textarea"
													name="description:en"
													label={t('description_en')}
													value={data?.['description:en']}
													onChange={e => handleChange('description:en', e.target.value)}
												/>
												<FormInput rows={4} type="textarea" name="our_vision:ar" label={t('vision_ar')} value={data?.['our_vision:ar']} onChange={e => handleChange('our_vision:ar', e.target.value)} />
												<FormInput rows={4} type="textarea" name="our_vision:en" label={t('vision_en')} value={data?.['our_vision:en']} onChange={e => handleChange('our_vision:en', e.target.value)} />
												<FormInput
													rows={4}
													type="textarea"
													name="our_mission:ar"
													label={t('mission_ar')}
													value={data?.['our_mission:ar']}
													onChange={e => handleChange('our_mission:ar', e.target.value)}
												/>
												<FormInput
													rows={4}
													type="textarea"
													name="our_mission:en"
													label={t('mission_en')}
													value={data?.['our_mission:en']}
													onChange={e => handleChange('our_mission:en', e.target.value)}
												/>
												<FormInput rows={4} type="textarea" name="our_tasks:ar" label={t('tasks_ar')} value={data?.['our_tasks:ar']} onChange={e => handleChange('our_tasks:ar', e.target.value)} />
												<FormInput rows={4} type="textarea" name="our_tasks:en" label={t('tasks_en')} value={data?.['our_tasks:en']} onChange={e => handleChange('our_tasks:en', e.target.value)} />
											</div>
										</Tab.Panel>

										{/* Contacts */}
										<Tab.Panel key="contacts">
											<div className="grid grid-cols-2 gap-6 mt-5">
												<FormInput name="trade_register" label={t('trade_register')} value={data?.trade_register} onChange={e => handleChange('trade_register', e.target.value)} />
												<FormInput name="tax_number" label={t('tax_number')} value={data?.tax_number} onChange={e => handleChange('tax_number', e.target.value)} />
												<FormInput name="phone" label={t('phone')} value={data?.phone} onChange={e => handleChange('phone', e.target.value)} />
												<FormInput name="mobile" label={t('mobile')} value={data?.mobile} onChange={e => handleChange('mobile', e.target.value)} />
												<FormInput name="whats_app" label={t('whatsapp')} value={data?.whats_app} onChange={e => handleChange('whats_app', e.target.value)} />
												<FormInput name="email" type="email" label={t('email')} value={data?.email} onChange={e => handleChange('email', e.target.value)} />
												<FormInput name="location" label={t('location')} value={data?.location} onChange={e => handleChange('location', e.target.value)} />
												<div className="col-span-2">
													<MapWithAddress />
												</div>
											</div>
										</Tab.Panel>

										{/* Social */}
										<Tab.Panel key="social">
											<div className="grid grid-cols-2 gap-6 mt-5">
												<FormInput name="facebook" label={t('facebook')} value={data?.facebook} onChange={e => handleChange('facebook', e.target.value)} />
												<FormInput name="whatsapp" label={t('whatsapp')} value={data?.whatsapp} onChange={e => handleChange('whatsapp', e.target.value)} />
												<FormInput name="linkedin" label={t('linkedin')} value={data?.linkedin} onChange={e => handleChange('linkedin', e.target.value)} />
												<FormInput name="twitter" label={t('twitter')} value={data?.twitter} onChange={e => handleChange('twitter', e.target.value)} />
												<FormInput name="instagram" label={t('instagram')} value={data?.instagram} onChange={e => handleChange('instagram', e.target.value)} />
												<FormInput name="youtube" label={t('youtube')} value={data?.youtube} onChange={e => handleChange('youtube', e.target.value)} />
												<FormInput name="snapchat" label={t('snapchat')} value={data?.snapchat} onChange={e => handleChange('snapchat', e.target.value)} />
												<FormInput name="tiktok" label={t('tiktok')} value={data?.tiktok} onChange={e => handleChange('tiktok', e.target.value)} />
											</div>
										</Tab.Panel>

										{/* Static Pages */}
										<Tab.Panel key="static-pages">
											<div className="grid grid-cols-2 gap-6 mt-5">
												<div className="col-span-2">
													<label className="font-semibold text-gray-500 capitalize">{t('privacy_en')}</label>
													<TextEditor initialContent={data?.['privacy_content:en']} onChange={val => handleChange('privacy_content:en', val)} />
												</div>
												<div className="col-span-2">
													<label className="font-semibold text-gray-500 capitalize">{t('privacy_ar')}</label>
													<TextEditor initialContent={data?.['privacy_content:ar']} onChange={val => handleChange('privacy_content:ar', val)} />
												</div>
												<div className="col-span-2">
													<label className="font-semibold text-gray-500 capitalize">{t('terms_en')}</label>
													<TextEditor initialContent={data?.['terms_content:en']} onChange={val => handleChange('terms_content:en', val)} />
												</div>
												<div className="col-span-2">
													<label className="font-semibold text-gray-500 capitalize">{t('terms_ar')}</label>
													<TextEditor initialContent={data?.['terms_content:ar']} onChange={val => handleChange('terms_content:ar', val)} />
												</div>
												<div className="col-span-2">
													<label className="font-semibold text-gray-500 capitalize">{t('about_en')}</label>
													<TextEditor initialContent={data?.['about_us:en']} onChange={val => handleChange('about_us:en', val)} />
												</div>
												<div className="col-span-2">
													<label className="font-semibold text-gray-500 capitalize">{t('about_ar')}</label>
													<TextEditor initialContent={data?.['about_us:ar']} onChange={val => handleChange('about_us:ar', val)} />
												</div>
											</div>
										</Tab.Panel>

										{/* SEO */}
										<Tab.Panel key="seo">
											<div className="grid grid-cols-2 gap-6 mt-5">
												<FormInput name="facebook_pixel" label={t('facebook_pixel')} value={data?.facebook_pixel} onChange={e => handleChange('facebook_pixel', e.target.value)} />
												<FormInput name="tiktok_pixel" label={t('tiktok_pixel')} value={data?.tiktok_pixel} onChange={e => handleChange('tiktok_pixel', e.target.value)} />
												<FormInput name="snapchat_pixel" label={t('snapchat_pixel')} value={data?.snapchat_pixel} onChange={e => handleChange('snapchat_pixel', e.target.value)} />
												<FormInput name="google_ads_pixel" label={t('google_ads_pixel')} value={data?.google_ads_pixel} onChange={e => handleChange('google_ads_pixel', e.target.value)} />
												<FormInput name="google_analytics" label={t('google_analytics')} value={data?.google_analytics} onChange={e => handleChange('google_analytics', e.target.value)} />
												<FormInput
													name="google_tag_manager_pixel"
													label={t('google_tag_manager_pixel')}
													value={data?.google_tag_manager_pixel}
													onChange={e => handleChange('google_tag_manager_pixel', e.target.value)}
												/>
											</div>
										</Tab.Panel>

										{/* Logos */}
										<Tab.Panel key="logos">
											<div className="grid grid-cols-4 gap-6 mt-5">
												<ProfileImageUpload onChange={(e: any) => handleChange('logo', e)} title={t('logo')} url={settings?.data?.logo} />
												<ProfileImageUpload onChange={(e: any) => handleChange('favicon', e)} title={t('favicon')} url={settings?.data?.favicon} />
												<ProfileImageUpload onChange={(e: any) => handleChange('loginLogo', e)} title={t('login_logo')} url={settings?.data?.loginLogo} />
												<ProfileImageUpload onChange={(e: any) => handleChange('footerBackground', e)} title={t('footer_bg')} url={settings?.data?.footerBackground} />
												<ProfileImageUpload onChange={(e: any) => handleChange('footerLogo', e)} title={t('footer_logo')} url={settings?.data?.footerLogo} />
												<ProfileImageUpload onChange={(e: any) => handleChange('siteLogo', e)} title={t('site_logo')} url={settings?.data?.siteLogo} />
												<ProfileImageUpload onChange={(e: any) => handleChange('hero', e)} title={t('hero')} url={settings?.data?.hero} />
											</div>
										</Tab.Panel>
									</Tab.Panels>
								</Tab.Group>

								<div className="mt-10 flex">
									<Button type="submit" className="text-lg w-36">
										{t('save')}
									</Button>
								</div>
							</form>
						</div>
					</div>
				)}
			</CardBody>
		</Card>
	)
}

export default Content
