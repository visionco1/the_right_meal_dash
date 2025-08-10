import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, useMapEvents, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setAddressInfo } from '@/redux/slices/settings/settings'
import ListItem from '../ui/list-item'
import Notify from '../ui/custom-toastify'
import L, { Icon } from 'leaflet'
// import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import markerIconPng from '../../assets/images/map-marker.png'
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png'
import { useTranslation } from 'react-i18next'

const MapController = ({ center }: { center: [number, number] }) => {
	const map = useMap()
	useEffect(() => {
		if (center) {
			map?.setView(center, 5)
		}
	}, [center])
	return null
}

const MapWithAddress: React.FC = () => {
	const { t } = useTranslation()
	const selector = (state: RootState) => state.settingsReducer
	const dispatch = useDispatch()
	const { addressInfo } = useSelector(selector)
	const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(addressInfo?.lat && addressInfo?.lng ? [addressInfo?.lat, addressInfo?.lng] : null)
	const handleMapClick = async (e: any) => {
		const { lat, lng } = e.latlng
		setMarkerPosition([lat, lng])

		try {
			const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
			const data = await response.json()
			const address = data.display_name || 'No address found'
			dispatch(setAddressInfo({ address: address, lat: lat, lng: lng }))
		} catch (error) {
			Notify('Error fetching address', 'error')
		}
	}

	const ClickHandler = () => {
		useMapEvents({
			click: handleMapClick
		})
		return null
	}
	// Create a custom icon and cast it as L.Icon
	const customIcon: Icon = new L.Icon({
		iconUrl: markerIconPng,
		shadowUrl: markerShadowPng,
		iconSize: [35, 51],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	})
	return (
		<div className="relative z-0">
			{addressInfo?.address && (
				<div className="my-2">
					<ListItem label={t('address')} value={addressInfo?.address} />
					<ListItem label={t('lat')} value={addressInfo?.lat} />
					<ListItem label={t('lng')} value={addressInfo?.lng} />
				</div>
			)}
			<MapContainer className="leaflet-container w-full h-[500px]">
				<MapController center={markerPosition || [26.8206, 30.8025]} />
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<ClickHandler />
				{markerPosition && <Marker position={markerPosition} icon={customIcon} />}
			</MapContainer>
		</div>
	)
}

export default MapWithAddress
