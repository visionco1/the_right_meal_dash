import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components'
import CustomSelect from '@/components/ui/custom-select'
import { useTranslation } from 'react-i18next'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { addGroup, addSubForm, removeGroup, removeSubForm, setGroups, updateGroupField, updateSubFormField } from './state-slice'
import { setSelect } from '@/helpers/helpers'
import { Props } from './type'

const MultiMultiForm = ({ sections, setSectionId, filtered_sections, sizes, all_sizes, disabledSections, initialData = [] }: Props) => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { groups } = useSelector((state: RootState) => state.multiFormReducer)
	useEffect(() => {
		if (initialData) {
			dispatch(setGroups(initialData))
		} else if (!groups.length) {
			dispatch(addGroup())
		}
	}, [JSON.stringify(initialData)])

	return (
		<div className="space-y-5">
			<div className="flex items-center justify-between mt-4">
				<h3 className="text-2xl font-bold text-gray-800 first-letter:uppercase">{t('multi_sections')}</h3>
				<Button onClick={() => dispatch(addGroup())} className="text-white" type="button">
					<FaPlus />
				</Button>
			</div>
			{groups?.map((group: any, groupIndex: number) => (
				<div key={groupIndex} className="p-6 border rounded-2xl bg-white shadow-sm space-y-4">
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-lg font-semibold capitalize">{group.groupName}</h3>
						{groups?.length > 1 && (
							<Button variant="destructive" onClick={() => dispatch(removeGroup(groupIndex))}>
								<FaTrash />
							</Button>
						)}
					</div>

					{group?.items?.map((form: any, itemIndex: number) => (
						<div key={itemIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl relative">
							<CustomSelect
								label={t('menu_section')}
								onChange={(e: any) => {
									dispatch(
										updateSubFormField({
											groupIndex,
											itemIndex,
											field: 'section_id',
											value: e?.id
										})
									)
									setSectionId(e?.id)
								}}
								placeholder={t('select_section')}
								isClearable={true}
								optionLabel="localized_name"
								optionValue="id"
								isDisabled={disabledSections}
								options={filtered_sections}
								value={setSelect(sections, form?.section_id)}
							/>
							<CustomSelect
								label={t('size')}
								onChange={(e: any) =>
									dispatch(
										updateSubFormField({
											groupIndex,
											itemIndex,
											field: 'size_id',
											value: e?.id
										})
									)
								}
								placeholder={t('select_size')}
								isClearable={true}
								optionLabel="localized_name"
								optionValue="id"
								options={sizes}
								isDisabled={disabledSections}
								value={setSelect(all_sizes, form?.size_id)}
							/>
							<FormInput
								label={t('qty_per_day')}
								placeholder={t('qty')}
								value={form.selected_quantity}
								onChange={(e: any) =>
									dispatch(
										updateSubFormField({
											groupIndex,
											itemIndex,
											field: 'selected_quantity',
											value: e.target.value
										})
									)
								}
							/>

							{group?.items?.length > 1 && (
								<Button variant={'destructive'} className="absolute right-3 px-3 w-7 h-7" size="sm" onClick={() => dispatch(removeSubForm({ groupIndex, itemIndex }))}>
									<FaTrash />
								</Button>
							)}
						</div>
					))}
					<FormInput
						label={t('total quantity')}
						placeholder={t('total quantity')}
						value={group.total_quantity}
						onChange={e =>
							dispatch(
								updateGroupField({
									groupIndex,
									field: 'total_quantity',
									value: e.target.value
								})
							)
						}
					/>
					<div className="text-right">
						<Button onClick={() => dispatch(addSubForm(groupIndex))} className="text-white w-10 h-10" type="button">
							<FaPlus />
						</Button>
					</div>
				</div>
			))}
		</div>
	)
}

export default MultiMultiForm
