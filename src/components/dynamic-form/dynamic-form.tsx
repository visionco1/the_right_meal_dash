import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { isEqual } from 'lodash'

type FormData = Record<string, string>

interface DynamicFormProps {
	handleSet: any
	keyName: string
	initialForm: any
	initialData?: FormData[]
	renderInputs: (form: FormData, index: number, handleChange: (index: number, field: string, value: string) => void) => React.ReactNode
	onSubmit?: (filledForms: FormData[]) => void
}

const DynamicForm = ({ initialData, initialForm, renderInputs, onSubmit, handleSet, keyName }: DynamicFormProps) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const filledForms = forms.filter(form => Object.values(form).some(val => val.trim() !== ''))
		if (onSubmit) {
			onSubmit(filledForms)
		}
	}

	const usePrevious = <T,>(value: T): T | undefined => {
		const ref = useRef<T>()
		useEffect(() => {
			ref.current = value
		}, [value])
		return ref.current
	}

	const initial = useMemo(() => {
		return initialData ? [...initialData, initialForm] : [initialForm]
	}, [initialData, initialForm])

	const [forms, setForms] = useState<FormData[]>(initial)
	const prevInitialData = usePrevious(initialData)
	const userHasEdited = useRef(false)

	// Detect user edits
	const handleChange = (index: number, field: string, value: any) => {
		userHasEdited.current = true
		const updatedForms = [...forms]
		const updatedForm = { ...updatedForms[index], [field]: value }
		updatedForms[index] = updatedForm
		setForms(updatedForms)
		handleSet(keyName, updatedForms)
	}

	useEffect(() => {
		const initialChanged = !isEqual(initialData, prevInitialData)

		if (initialData && initialChanged && !userHasEdited.current) {
			setForms(initial)
		}
	}, [initialData, initial, prevInitialData])
	const handleAddForm = () => {
		userHasEdited.current = true
		setForms([...forms, { ...initialForm }])
	}

	const handleRemoveForm = (index: number) => {
		userHasEdited.current = true
		const updated = forms.filter((_, i) => i !== index)
		setForms(updated)
		handleSet(keyName, updated)
	}
	return (
		<div>
			{forms?.map((form, index) => {
				const isLast = index === forms.length - 1
				return (
					<div className="flex gap-2 w-full items-end my-3" key={index}>
						{renderInputs(form, index, handleChange)}

						{!isLast && (
							<Button type="button" variant="destructive" className="font-bold text-md" onClick={() => handleRemoveForm(index)}>
								<FaTrash />
							</Button>
						)}
						{isLast && (
							<Button type="button" className="font-bold text-md" onClick={handleAddForm}>
								<FaPlus />
							</Button>
						)}
					</div>
				)
			})}
			{onSubmit && (
				<Button onClick={handleSubmit} type="submit">
					Submit
				</Button>
			)}
		</div>
	)
}

export default DynamicForm
