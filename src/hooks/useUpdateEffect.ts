import { useEffect, useRef } from 'react'

export const useUpdateEffect = (
	effect: React.EffectCallback,
	dependencies: React.DependencyList
) => {
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
		} else {
			effect()
		}
	}, dependencies)
}
