import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SubFormItem = {
	section_id: any
	size_id: any
	selected_quantity: string
	multi_index: string
}

type GroupForm = {
	groupName: string
	total_quantity: string
	items: SubFormItem[]
}

interface FormGroupsState {
	groups: GroupForm[]
}

const initialState: FormGroupsState = {
	groups: []
}

export const multiFormSlice = createSlice({
	name: 'multi-form-slice',
	initialState,
	reducers: {
		setGroups: (state, action: PayloadAction<GroupForm[]>) => {
			state.groups = action.payload
		},
		addGroup: state => {
			const newGroup: GroupForm = {
				groupName: `Group ${state.groups.length + 1}`,
				total_quantity: '',
				items: [{ section_id: null, size_id: null, selected_quantity: '', multi_index: String(state.groups.length) }]
			}
			state.groups.push(newGroup)
		},
		removeGroup: (state, action: PayloadAction<number>) => {
			state.groups.splice(action.payload, 1)
		},
		updateGroupField: (
			state,
			action: PayloadAction<{
				groupIndex: number
				field: keyof GroupForm
				value: any
			}>
		) => {
			const { groupIndex, field, value } = action.payload
			state.groups[groupIndex][field] = value
		},
		addSubForm: (state, action: PayloadAction<number>) => {
			state.groups[action.payload].items.push({
				section_id: null,
				size_id: null,
				selected_quantity: '',
				multi_index: String(action.payload)
			})
		},
		removeSubForm: (state, action: PayloadAction<{ groupIndex: number; itemIndex: number }>) => {
			const { groupIndex, itemIndex } = action.payload
			state.groups[groupIndex].items.splice(itemIndex, 1)
		},
		updateSubFormField: <K extends keyof SubFormItem>(
			state: FormGroupsState,
			action: PayloadAction<{
				groupIndex: number
				itemIndex: number
				field: K
				value: SubFormItem[K]
			}>
		) => {
			const { groupIndex, itemIndex, field, value } = action.payload
			state.groups[groupIndex].items[itemIndex][field] = value
		},
		reset: state => {
			state.groups = []
		}
	}
})

export const { setGroups, addGroup, removeGroup, updateGroupField, addSubForm, removeSubForm, updateSubFormField, reset } = multiFormSlice.actions

export const multiFormReducer = multiFormSlice.reducer
