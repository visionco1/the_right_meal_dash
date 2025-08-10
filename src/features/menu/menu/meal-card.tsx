import { FaExpandArrowsAlt, FaTrash } from 'react-icons/fa'
import CustomSwitch from '@/components/ui/custom-switch'
import { useChefChoice, useDeleteSectionMeal } from './hooks'
import { Loading } from '@/components/ui/Loading'
import Icon from '@/components/ui/icon'
import ConfirmModal from '@/components/modals/confirm-modal'
import { TMealItem } from './type'
import { useTranslation } from 'react-i18next'

const MealCard = ({ item, dragHandleProps }: { item: TMealItem; dragHandleProps?: any }) => {
	const { t } = useTranslation()
	const { loading, changeChefChoice } = useChefChoice()
	const { deleteLoading, handleDelete, openDeleteModal, setOpenDeleteModal, handleDeleteModal } = useDeleteSectionMeal()

	return (
		<div
			className="bg-[#f2f2f7] px-1 h-16 rounded-sm capitalize text-gray-700
        font-medium flex items-center overflow-hidden relative"
		>
			<ConfirmModal
				loading={deleteLoading}
				handleClick={handleDelete}
				openModal={openDeleteModal}
				setOpenModal={setOpenDeleteModal}
				message={t('confirm_delete_section_meal')}
				btnValue={t('delete')}
			/>
			{loading && <Loading />}
			<FaExpandArrowsAlt className="text-lg mx-2 flex-shrink-0" {...dragHandleProps} />
			<div className="flex items-center text-md justify-between gap-1 px-2">
				<p className="w-28 truncate">{item?.localized_name}</p>
				<p>{t('chefs_choice')}</p>
				<CustomSwitch
					onChange={e => changeChefChoice(e?.target?.id, { is_chef_choice: e?.target?.checked ? 1 : 0 })}
					defaultChecked={item?.is_chef_choice}
					id={item?.section_meal_id}
					labelOff={t('off')}
					labelOn={t('on')}
				/>
				<Icon onClick={() => handleDeleteModal(item?.section_meal_id)} icon={<FaTrash className="text-red-600" />} />
			</div>
		</div>
	)
}

export default MealCard
