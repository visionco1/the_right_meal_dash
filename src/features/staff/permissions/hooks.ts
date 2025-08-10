import { RootState } from '@/redux/store'
import { useFetchData } from '@/hooks'
import { getPermissions } from '@/redux/slices/staff/permissions'

export const useGetAllPermissions = () => {
	const selector = (state: RootState) => state.permissionsReducer
	const { loading, error, data } = useFetchData(getPermissions, selector)

	return { loading, error, data }
}
