import { useNutritionFactHook } from '@/features/menu/nutrition-facts/hooks'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TablePagination, TableRow, TableSearch } from '@/components/ui/custom-table'
import Icon from '@/components/ui/icon'
import { Loading } from '@/components/ui/Loading'
import { FaEdit } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { Card, CardBody, CardHeader } from '@/components/ui/card'

const NutritionFactsContent = () => {
	const { t } = useTranslation()
	const { tableRef, onDownload, loading, data, getPage, onSearch, permission, search } = useNutritionFactHook()

	return (
		<Card>
			<CardHeader>
				{permission('show') && (
					<Button variant="light" onClick={onDownload}>
						{t('export_excel')}
					</Button>
				)}
			</CardHeader>
			<CardBody>
				{loading && <Loading />}
				{permission('index') && (
					<>
						<TableSearch search={search} onSearch={onSearch} />
						<Table ref={tableRef}>
							<TableHeader>
								<TableRow>
									<TableHead>{t('meal_name')}</TableHead>
									<TableHead>{t('meal_category')}</TableHead>
									{permission('update') && <TableHead>{t('actions')}</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{data?.data?.data?.map((item: any, i: number) => (
									<TableRow key={i} className={`relative ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-600' : ''}`}>
										<TableCell>{item?.localized_meal}</TableCell>
										<TableCell>{item?.localized_meal_category}</TableCell>
										{permission('update') && (
											<TableCell>
												<div className="h-full flex gap-2 justify-start items-center">
													<Icon to={`/menu-management/nutrition-facts/edit/${item?.meal_id}`} icon={<FaEdit className="text-green-500" />} />
												</div>
											</TableCell>
										)}
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

export default NutritionFactsContent
