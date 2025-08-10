import * as React from 'react'
import { Button } from './button'
import { useDebouncedCallback } from 'use-debounce'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useCallback, useState } from 'react'
import NoData from './no-data'
import { cn } from '@/utils/utils'
import FormInput from './form-input'
import { useTranslation } from 'react-i18next'
// table Row type

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
	expanded?: boolean
	internalRows?: any
	columns?: object
	collapseDir?: 'top' | 'bottom'
	onToggle?: () => void
}

// types
export type TDataRow = { id: number; [key: string]: any }
// If you want to enforce specific types for additional properties, you can replace 'any' with a more specific type.

export interface ITable<T extends TDataRow> {
	// start search
	search: string
	setSearch: React.Dispatch<React.SetStateAction<string>>
	// start selected rows
	selectedRows: number[]
	setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>
	selectRowById: (id: number) => void
	toggleSelectAll: (check: boolean, data: T[], key?: string) => void
	deleteRows: (callback: (selectedRows: number[]) => void) => void
	isRowSelected: (id: number) => boolean
	// start page pagination
	page: number
	setPage: React.Dispatch<React.SetStateAction<number>>
	// start sorting type
	sortDir: 'asc' | 'desc'
	setSortDir: React.Dispatch<React.SetStateAction<ITable<T>['sortDir']>>
	sortColumn: string | null | undefined
	setSortColumn: React.Dispatch<React.SetStateAction<ITable<T>['sortColumn']>>
	sort: (columnKey: string) => void
	// New data management
	data: any
	setData: React.Dispatch<React.SetStateAction<T[]>>
	setAllData: (newData: any) => void // Function to set all data
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

// useTable Hook
export const useTable = <T extends TDataRow>(): ITable<T> => {
	/**************************** start handle search **************************/

	const [search, setSearch] = useState<ITable<T>['search']>('')
	/********************* start handle pagination page ************************/

	const [page, setPage] = useState<ITable<T>['page']>(1)

	/************************** start handle loading ************************/
	const [loading, setLoading] = useState<boolean>(false)
	/************************** start handle select row ************************/
	// start selected rows state
	const [selectedRows, setSelectedRows] = useState<ITable<T>['selectedRows']>([])
	const isRowSelected = useCallback((id: number) => selectedRows.includes(id), [selectedRows])

	// start handle select row by id
	const selectRowById: ITable<T>['selectRowById'] = id => {
		setSelectedRows(old => (old.includes(id) ? old.filter(rowId => rowId != id) : [...old, id]))
	}

	// start handle toggle select all
	const toggleSelectAll: ITable<T>['toggleSelectAll'] = useCallback((check, data, key = 'id') => {
		setSelectedRows?.(!check ? [] : data.map(row => row?.[key]))
	}, [])

	// start handle delete selected
	const deleteRows: ITable<T>['deleteRows'] = useCallback(callback => {
		const confirmed = window.confirm('Do you really want to delete this record?')
		if (!confirmed) return
		callback(selectedRows)
		setSelectedRows([])
	}, [])

	/************************** start handle sort ************************/

	// start sort states
	const [sortDir, setSortDir] = useState<ITable<T>['sortDir']>('asc')
	const [sortColumn, setSortColumn] = useState<ITable<T>['sortColumn']>(null)

	// handle sort change
	const sort: ITable<T>['sort'] = useCallback(
		columnName => {
			setSortColumn(columnName)
			setSortDir(sortDir == 'asc' ? 'desc' : 'asc')
		},
		[sortDir]
	)

	/************************** start handle sort ************************/

	/************************** start handle data ************************/
	const [data, setData] = useState<T[]>([]) // New state for table data

	// Function to set all data
	const setAllData: ITable<T>['setAllData'] = newData => {
		setData(newData)
	}

	return {
		page,
		setPage,
		search,
		setSearch,
		selectedRows,
		isRowSelected,
		setSelectedRows,
		selectRowById,
		toggleSelectAll,
		deleteRows,
		sortDir,
		setSortDir,
		sortColumn,
		setSortColumn,
		sort,
		data,
		setData,
		setAllData,
		setLoading
	}
}

// the table
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, children, ...props }, ref) => {
	return (
		<div className="custom-table relative w-full overflow-auto lg:overflow-visible mt-5">
			<div className="table-wrapper">
				<table ref={ref} className={cn('w-full caption-bottom [&_input]:w-auto rounded-md', className)} {...props}>
					{children}
				</table>
			</div>
		</div>
	)
})
Table.displayName = 'Table'

/* table header */
const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
	<thead ref={ref} className={cn('font-bold text-sm', className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

/* table head */
const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement> & { onSort?: (() => void) | null | undefined }>(({ onSort, className, ...props }, ref) => (
	<th
		ref={ref}
		className={cn('h-10 px-4 py-5 text-start align-middle first-letter:uppercase font-normal text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className)}
		{...props}
		onClick={e => onSort && onSort()}
	>
		{props.children}
	</th>
))
TableHead.displayName = 'TableHead'

// table body
const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement> & { colSpan?: number }>(({ className, children, ...props }, ref) => {
	const hasData = React.Children.count(children) > 0

	return (
		<tbody
			ref={ref}
			className={cn('divide-y divide-gray-500 dark:divide-gray-900', className)}
			{...props}
			// className={cn('[&_tr:last-child]:border-0', hasData && 'text-xs', className)}
			// {...props}
		>
			{hasData ? (
				children
			) : (
				<TableRow>
					<TableCell colSpan={100}>
						<NoData />
					</TableCell>
				</TableRow>
			)}
		</tbody>
	)
})

// Collapsed row
const CollapsedRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(({ className, expanded, onToggle, children, internalRows, collapseDir, columns, ...props }, ref) => {
	const [isExpanded, setIsExpanded] = React.useState(expanded)

	React.useEffect(() => {
		setIsExpanded(expanded)
	}, [expanded])

	const handleToggle = React.useCallback(() => {
		setIsExpanded(!isExpanded)
		onToggle?.()
	}, [isExpanded, onToggle])

	return (
		<>
			{collapseDir === 'top' && isExpanded
				? internalRows?.map((row: any) => {
						return row
					})
				: null}

			<TableRow ref={ref} className={cn(isExpanded ? 'expanded' : 'collapsed', className)} {...props}>
				<TableCell className="py-2 px-4">
					<button className="font-bold text-xl text-gray-600 hover:text-gray-900" onClick={handleToggle} disabled={internalRows?.[0]?.length > 0 ? false : true}>
						{isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
					</button>
				</TableCell>

				{React.Children.map(children, (child: any, index: number) => {
					return React.cloneElement(child, {
						key: index
					})
				})}
			</TableRow>

			{(collapseDir === undefined || collapseDir === 'bottom') && isExpanded
				? internalRows?.map((row: any) => {
						return row
					})
				: null}
		</>
	)
})
CollapsedRow.displayName = 'CollapsedRow'

/* table Collapsed */
const Collapsed = ({ expanded, children }: { expanded?: boolean; children: (isExpanded: boolean, setIsExpanded: (e: boolean) => void) => React.ReactNode }) => {
	React.useEffect(() => {
		setIsExpanded(expanded ?? false)
	}, [expanded])

	const [isExpanded, setIsExpanded] = React.useState<boolean>(expanded ?? false)
	return children(isExpanded, setIsExpanded)
}
Collapsed.displayName = 'Collapsed'

// table Row
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(({ className, children, ...props }, ref) => {
	return (
		<tr ref={ref} className={cn(className, 'border-none')} {...props}>
			{children}
		</tr>
	)
})
TableRow.displayName = 'TableRow'

/* table cell */
const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
	<td ref={ref} style={{ maxWidth: '250px' }} className={cn('px-4 py-4 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] z-10', className)} {...props} />
))
TableCell.displayName = 'TableCell'

/* table footer */
const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
	<tfoot ref={ref} className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} {...props} />
))
TableFooter.displayName = 'TableFooter'

/* table caption */
const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(({ className, ...props }, ref) => (
	<caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
))
TableCaption.displayName = 'TableCaption'

// table pagination
const TablePagination: React.FC<{
	// data?: ApiResponseTable<any>
	data?: any
	onPageChange: (page: number) => void
}> = ({ data, onPageChange }) => {
	if (!data) return
	const { t } = useTranslation()
	const { current_page = 1, last_page = 0, from = 1, per_page = 10, total = 0 } = data

	const handlePrevious = () => {
		if (current_page > 1) onPageChange(current_page - 1)
	}

	const handleNext = () => {
		if (current_page < last_page) onPageChange(current_page + 1)
	}

	return (
		<div className="flex justify-end items-center gap-3 p-3 w-full bg-white dark:bg-gray-800">
			<span className="flex gap-2 text-xs text-gray-500 mx-4">
				{from}-{from + per_page - 1} of {total}
			</span>
			<Button variant="light" onClick={handlePrevious} disabled={current_page === 1}>
				{t('prev')}
			</Button>
			<Button variant="primary" onClick={handleNext} disabled={current_page === last_page}>
				{t('next')}
			</Button>
		</div>
	)
}
TablePagination.displayName = 'TablePagination'

// table search
export const TableSearch = ({
	search,
	onSearch,
	className
}: {
	search: string
	onSearch: (e: string) => void
	// className?: ClassName['className']
	className?: any
}) => {
	const { t } = useTranslation()
	const [text, setText] = React.useState(search)
	// const debounced = useDebouncedCallback((value) => onSearch(value), 1000)
	const debounced = useDebouncedCallback(value => onSearch(value))
	const handleSubmit = (e: any) => {
		e.preventDefault()
		if (text !== '') {
			debounced(text)
		}
	}
	return (
		<div className={cn('relative max-w-[300px] w-full', className)}>
			<form className="flex items-center gap-2" onSubmit={handleSubmit}>
				<FormInput
					id="search"
					name="search"
					type="text"
					placeholder={t('search')}
					aria-label="Search Input"
					value={text}
					onChange={e => {
						if (e.target.value === '') {
							debounced(e.target.value)
						}
						setText(e.target.value)
					}}
				/>
				<Button type="submit">{t('search')}</Button>
			</form>
		</div>
	)
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, CollapsedRow, TableCell, TableCaption, TablePagination, Collapsed }
