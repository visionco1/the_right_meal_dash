import { useEffect, useState } from 'react'
import { useMap, useMapEvents } from 'react-leaflet'
import { setMapCenter, setRectangleCoords, setSelectedPlace } from '@/redux/slices/delivery/zones'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export type PlaceSuggestion = {
	name: string
	lat: number
	lon: number
	type: string
}
export const useMapHook = () => {
	const selector = (state: RootState) => state.zonesReducer
	const { selectedPlace, mapCenter, rectangleCoords, loading } = useSelector(selector)
	const dispatch = useDispatch()

	const RectangleSelector = ({ onSelect }: { onSelect: (polygon: [number, number][]) => void }) => {
		const [points, setPoints] = useState<[number, number][]>([])

		useMapEvents({
			click(e: any) {
				const latlng: [number, number] = [e.latlng.lat, e.latlng.lng]

				// Add point to current list
				const updatedPoints = [...points, latlng]
				setPoints(updatedPoints)

				if (updatedPoints.length === 4) {
					// Ensure the polygon is closed (start = end)
					const polygon = [...updatedPoints, updatedPoints[0]]

					onSelect(polygon) // Send the polygon to parent
					setPoints([]) // Reset for next selection
				}
			}
		})

		return null
	}
	// Fetch coordinates by place name
	const fetchCoordinatesByPlace = async (place: string) => {
		const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`, {
			headers: {
				'Accept-Language': 'ar'
			}
		})
		const data = await response.json()
		if (data && data.length > 0) {
			const result = data[0]
			return {
				center: [parseFloat(result?.lat), parseFloat(result?.lon)],
				boundingBox: result?.boundingbox?.map(Number)
			}
		}
		return null
	}

	// Component to control map center dynamically
	const MapController = ({ center }: { center: [number, number] }) => {
		const map = useMap()
		useEffect(() => {
			if (center?.length) {
				map?.setView(center, 7)
			} else {
				map?.setView([26.8206, 30.8025], 5)
			}
		}, [center, map, rectangleCoords])

		return null
	}

	const handleSelectRectangle = (coords: [number, number][]) => {
		dispatch(setRectangleCoords(coords))
	}

	const handleReset = () => {
		dispatch(setRectangleCoords([]))
	}

	const handlePlaceChange = async (e: any) => {
		dispatch(setSelectedPlace(e))

		const result: any = await fetchCoordinatesByPlace(e)
		if (result?.center) {
			dispatch(setMapCenter(result?.center))
		}
	}

	const FitBoundsController = ({ bounds }: { bounds: [number, number][] }) => {
		const map = useMap()

		useEffect(() => {
			if (bounds?.length >= 1) {
				map?.fitBounds(bounds)
			}
		}, [bounds, map])

		return null
	}
	// code for suggestions during search
	const suggestPlaces = async (query: string): Promise<PlaceSuggestion[]> => {
		const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=7`, {
			headers: {
				'Accept-Language': 'ar' // or dynamically use navigator.language
			}
		})

		const data = await response.json()

		if (!Array.isArray(data)) return []

		// Optional: filter by importance or known types
		return data
		// return data
		// 	.filter((item: any) => ['country', 'state', 'city', 'town', 'village', 'capital'].includes(item?.type))
		// 	.map((item: any) => ({
		// 		name: item.display_name,
		// 		lat: parseFloat(item.lat),
		// 		lon: parseFloat(item.lon),
		// 		type: item.type
		// 	}))
	}
	const [query, setQuery] = useState('')
	const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([])
	const [showSuggestions, setShowSuggestions] = useState(false)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (value != '') {
			setQuery(value)
		}

		if (value.trim()) {
			suggestPlaces(value).then(res => {
				setSuggestions(res)
				setShowSuggestions(true)
			})
		} else {
			setSuggestions([])
			setShowSuggestions(false)
		}
	}
	const handleSelect = (place: PlaceSuggestion) => {
		setQuery(place.name) // set input to selected suggestion
		setSuggestions([])
		setShowSuggestions(false)
		handlePlaceChange(place.name) // optional: trigger map or location logic
	}
	return {
		RectangleSelector,
		fetchCoordinatesByPlace,
		MapController,
		selectedPlace,
		mapCenter,
		rectangleCoords,
		handlePlaceChange,
		handleSelectRectangle,
		handleReset,
		FitBoundsController,
		loading,
		suggestPlaces,
		query,
		suggestions,
		showSuggestions,
		handleChange,
		handleSelect,
		setShowSuggestions
	}
}
