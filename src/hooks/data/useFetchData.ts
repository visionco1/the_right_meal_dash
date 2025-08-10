import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { AppDispatch, RootState } from '@/redux/store'

const useFetchData = (action: (params: any) => any, selector: (state: RootState) => any, params?: object, cached?: boolean) => {
	const dispatch = useDispatch<AppDispatch>()
	const { loading, error, data } = useSelector(selector)
	const active_data = data?.data?.data?.filter((item: any) => item?.is_active)
	useEffect(() => {
		if (!params) {
			dispatch(action({}))
		}
	}, [])

	const prevParams = useRef<any>(null)

	useEffect(() => {
		if (params && JSON.stringify(params) != JSON.stringify(prevParams.current)) {
			prevParams.current = params
			dispatch(action(params || {}))
		}
	}, [params, dispatch])

	const [search, setSearch] = useState('')

	const getPage = (page: number, perPage?: number) => {
		dispatch(action({ page: page || '', per_page: perPage || '', name: search }))
	}

	const onSearch = (e: string, params?: any) => {
		setSearch(e)
		dispatch(action({ name: e, ...params }))
	}

	const handleFetch = (filter_params: any) => {
		dispatch(action(filter_params || {}))
	}

	return { loading, error, data, getPage, onSearch, search, handleFetch, active_data }
}
export default useFetchData
