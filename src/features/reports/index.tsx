import { Button } from '@/components/ui/button'
import CustomSelect from '@/components/ui/custom-select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow } from '@/components/ui/custom-table'
import { Loading } from '@/components/ui/Loading'
import FormInput from '@/components/ui/form-input'
import { Link } from 'react-router-dom'
import { useExportReports, useReportHook } from './hooks'
import { useGetAllCountries } from '../settings/countries/hooks'
import { useGetStates } from '../settings/states/hooks'
import { useGetCities } from '../settings/cities/hooks'
import { useGetSubscriptionPlans } from '../plans-management/plans/hooks'
import { useGetAllZones } from '../delivery/zones/hooks'
import { useGetAllDeliveries } from '../delivery/delivery-men/hooks'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'
import { setSelect } from '@/helpers/helpers'
import ExportDeliveryNotes from './export_delivery_notes'
import ExportMealCount from './export-meal-count'
import ExportNotes from './export-notes'
import ExportAll from './export-all'
import ExportQualityReport from './export-quality'

const PackagingReportContent = () => {
	const { t } = useTranslation()
	const { tableRef, onDownload, permission, loading, data, getPage, handleChangeFilter, filter_data, handleSearch } = useReportHook()
	const { active_data: countries } = useGetAllCountries({ is_paginated: 0 })
	const { active_data: states } = useGetStates({ is_paginated: 0 })
	const { active_data: cities } = useGetCities({ is_paginated: 0 })
	const { active_data: plans } = useGetSubscriptionPlans({ is_paginated: 0 })
	const { active_data: zones } = useGetAllZones({ is_paginated: 0 })
	const { data: captains } = useGetAllDeliveries({ is_paginated: 0 })

	const status = [
		{ id: 'preparing', name: t('preparing') },
		{ id: 'on_the_road', name: t('on the road') },
		{ id: 'delivered', name: t('delivered') }
	]

	const { exportMealPdf, loadingSingle } = useExportReports(filter_data?.date)
	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<div className="flex gap-2 flex-wrap">
						<Button variant={'primary'} onClick={onDownload}>
							{t('export_excel')}
						</Button>
						<Button variant={'primary'} onClick={exportMealPdf} loading={loadingSingle}>
							{t('export_meal_sticker_pdf')}
						</Button>
						<ExportAll date={filter_data?.date} />
						<ExportNotes date={filter_data?.date} />
						<ExportMealCount date={filter_data?.date} />
						<ExportDeliveryNotes date={filter_data?.date} />
						<ExportQualityReport date={filter_data?.date} />
					</div>
				)}
			</CardHeader>
			<CardBody>
				{loading && <Loading />}
				{permission('index') && (
					<>
						<div className="filter">
							<h3 className="text-lg font-bold">{t('reports_filter')}</h3>
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 items-end">
								<CustomSelect
									label={t('country')}
									onChange={(e: any) => handleChangeFilter('country_id', e?.id)}
									placeholder={t('select_country')}
									options={countries}
									value={setSelect(countries, filter_data?.country_id)}
									isClearable
									optionLabel="localized_name"
									optionValue="id"
								/>
								<CustomSelect
									label={t('state')}
									onChange={(e: any) => handleChangeFilter('state_id', e?.id)}
									placeholder={t('select_state')}
									options={states}
									value={setSelect(states, filter_data?.state_id)}
									isClearable
									optionLabel="localized_name"
									optionValue="id"
								/>
								<CustomSelect
									label={t('city')}
									onChange={(e: any) => handleChangeFilter('city_id', e?.id)}
									placeholder={t('select_city')}
									options={cities}
									value={setSelect(cities, filter_data?.city_id)}
									isClearable
									optionLabel="localized_name"
									optionValue="id"
								/>
								<CustomSelect
									label={t('plan')}
									onChange={(e: any) => handleChangeFilter('plan_id', e?.id)}
									placeholder={t('select_plan')}
									options={plans}
									value={setSelect(plans, filter_data?.plan_id)}
									isClearable
									optionLabel="localized_name"
									optionValue="id"
								/>
								<FormInput
									onChange={(e: any) => handleChangeFilter('date', e.target.value)}
									label={t('date')}
									onFocus={(e: any) => (e.target.type = 'date')}
									onBlur={(e: any) => (e.target.type = 'text')}
									type="text"
									value={filter_data?.date}
									placeholder={t('date')}
								/>
								<CustomSelect
									label={t('order_status')}
									onChange={(e: any) => handleChangeFilter('order_status', e?.id)}
									placeholder={t('select_status')}
									options={status}
									value={setSelect(status, filter_data?.order_status)}
									isClearable
									optionLabel="name"
									optionValue="id"
								/>
								<CustomSelect
									label={t('zone')}
									onChange={(e: any) => handleChangeFilter('zone_id', e?.id)}
									placeholder={t('select_zone')}
									options={zones}
									value={setSelect(zones, filter_data?.zone_id)}
									isClearable
									optionLabel="localized_name"
									optionValue="name"
								/>
								<CustomSelect
									label={t('captain')}
									onChange={(e: any) => handleChangeFilter('captain_id', e?.id)}
									placeholder={t('select_captain')}
									options={captains?.data?.data}
									value={setSelect(captains?.data?.data, filter_data?.captain_id)}
									isClearable
									optionLabel="localized_name"
									optionValue="name"
								/>
							</div>
							<Button className="w-fit my-3" variant={'primary'} onClick={handleSearch}>
								{t('search')}
							</Button>
						</div>
						<Table className="mt-8 w-full print:block" ref={tableRef}>
							<TableHeader>
								<TableRow>
									<TableHead>{t('sub_name')}</TableHead>
									<TableHead>{t('customer_name')}</TableHead>
									<TableHead>{t('location')}</TableHead>
									<TableHead>{t('status')}</TableHead>
									<TableHead>{t('zone')}</TableHead>
									<TableHead>{t('delivery_period')}</TableHead>
									<TableHead>{t('captain')}</TableHead>
									<TableHead>{t('meals')}</TableHead>
									<TableHead>{t('note')}</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
										<TableCell>{item?.localized_sub_name}</TableCell>
										<TableCell className="text-primary">
											{item?.customer_id ? <Link to={`/customers-management/customers/${item?.customer_id}`}>{item?.localized_customer_name}</Link> : item?.localized_customer_name}
										</TableCell>
										<TableCell>{item?.location}</TableCell>
										<TableCell>{item?.status}</TableCell>
										<TableCell>{item?.localized_zone}</TableCell>
										<TableCell>
											<p>
												{t('from')}: {item?.delivery_period_from}
											</p>
											<p>
												{t('to')}: {item?.delivery_period_to}
											</p>
										</TableCell>
										<TableCell>{item?.captin}</TableCell>
										<TableCell>
											<p className="h-20 overflow-auto">{item?.meals?.map((m: any) => m?.localized_meal_name)?.join(',')}</p>
										</TableCell>
										<TableCell>{item?.note}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						<TablePagination data={data?.data?.meta} onPageChange={getPage} />
					</>
				)}
			</CardBody>
		</Card>
	)
}

export default PackagingReportContent
