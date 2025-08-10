import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import MealDraggableWrapper from './draggable-wrapper'
import { Button } from '@/components/ui/button'
import { FaEdit } from 'react-icons/fa'
import { useCreateSectionMeal } from '../section-meals/hooks'
import { useShowSingleMenu } from './hooks'
import CustomModal from '@/components/ui/custom-modal'
import { Loading } from '@/components/ui/Loading'
import CustomSelect from '@/components/ui/custom-select'
import DayTab from './day-tab'
import { useTranslation } from 'react-i18next'

const PersistentTabs = () => {
	const { t } = useTranslation()
	const { showLoading, showResponse } = useShowSingleMenu()
	const { createLoading, handleCreateSectionMeal, openModal, setOpenModal, handleChangeCategory, handleChange, meal_categories, meals, meal_category, data, handleOpenModal } = useCreateSectionMeal()
	const storageKey = 'selectedTabIndex'

	// 1. Initialize selected index from localStorage
	const [selectedIndex, setSelectedIndex] = useState<number>(() => {
		const saved = localStorage.getItem(storageKey)
		return saved ? parseInt(saved, 10) : 0
	})

	// 2. Update localStorage whenever index changes
	useEffect(() => {
		localStorage.setItem(storageKey, selectedIndex.toString())
	}, [selectedIndex])

	return (
		<>
			<CustomModal
				titleHead={t('add_meal_to_section')}
				classNameContent="overflow-visible"
				isOpen={openModal}
				setIsOpen={setOpenModal}
				open={openModal}
				closeOnClickOut={true}
				position="center"
				body={
					<div className="pt-5 w-[80vw] lg:w-[40vw] p-3">
						{createLoading && <Loading />}
						<form onSubmit={e => handleCreateSectionMeal(e)}>
							<div className="grid grid-cols-1 gap-5 mb-8 items-center">
								<CustomSelect
									value={meal_category}
									onChange={(e: any) => handleChangeCategory(e)}
									label={t('meal_category')}
									placeholder={t('select_meal_category')}
									options={meal_categories}
									isClearable={true}
									optionLabel="localized_name"
									optionValue="id"
								/>
								{meal_category && (
									<CustomSelect
										value={data?.meal_id}
										onChange={(e: any) => handleChange('meal_id', e)}
										placeholder={t('select_meal')}
										label={t('meal')}
										options={meals}
										isClearable={true}
										optionLabel="localized_name"
										optionValue="id"
									/>
								)}
							</div>
							<div className="my-5 flex gap-3 ">
								<Button variant="primary" type="submit">
									{t('save')}
								</Button>
								<Button type="button" variant="light" onClick={() => setOpenModal(false)}>
									{t('cancel')}
								</Button>
							</div>
						</form>
					</div>
				}
			/>
			{showLoading ? (
				<Loading />
			) : (
				<Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
					<div className="w-[calc(100vw-100px)] md:w-[calc(100vw-200px)] lg:w-[calc(100vw-500px)] overflow-auto my-5">
						<Tab.List as="nav" className="w-full relative z-0 flex border rounded-xl dark:border-gray-600 my-4">
							{showResponse?.data?.menu_days?.map((item: any) => <DayTab item={item} key={item?.id} />)}
						</Tab.List>
					</div>

					<Tab.Panels>
						{showResponse?.data?.menu_days?.map((item: any) => (
							<Tab.Panel key={item?.id}>
								{item?.sections?.map((ele: any, i: number) => (
									<div className="flex items-start justify-between gap-2 my-10" key={i}>
										<h3 className="bg-primary/20 py-4 px-8 h-16 w-60 truncate text-wrap overflow-hidden rounded-sm capitalize text-primary">{ele?.localized_name}</h3>
										<div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-1">
											<MealDraggableWrapper items={ele?.meals} />
										</div>
										<Button onClick={() => handleOpenModal(item, ele)}>
											<FaEdit />
										</Button>
									</div>
								))}
							</Tab.Panel>
						))}
					</Tab.Panels>
				</Tab.Group>
			)}
		</>
	)
}

export default PersistentTabs
