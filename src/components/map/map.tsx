import { MapContainer, Polygon, TileLayer } from 'react-leaflet'
import { Button } from '@/components/ui/button'
import { useMapHook } from './hook'
import 'leaflet/dist/leaflet.css'
import FormInput from '../ui/form-input'
import { useTranslation } from 'react-i18next'

const Map = ({ showReset = true }: { showReset?: boolean }) => {
	const { t } = useTranslation()
	const {
		RectangleSelector,
		MapController,
		mapCenter,
		rectangleCoords,
		handleSelectRectangle,
		handleReset,
		FitBoundsController,
		loading,
		query,
		suggestions,
		showSuggestions,
		handleChange,
		handleSelect,
		setShowSuggestions
	} = useMapHook()

	return (
		<div className="w-full h-[500px] relative z-0">
			<div className="flex items-center justify-between absolute top-[-80px] left-0 mb-6 py-3 w-full">
				<div className="flex gap-2 items-end">
					{/* <FormInput
						containerClass="w-[300px]"
						onChange={e => suggestPlaces(e.target.value).then(res => console.log(res))}
						onBlur={e => handlePlaceChange(e.target.value)}
						label="search"
						placeholder="search.."
					/> */}
					<div className="relative w-[300px]">
						<FormInput
							containerClass="w-full"
							value={query}
							onChange={handleChange}
							onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // delay to allow click
							onFocus={() => {
								if (suggestions.length > 0) setShowSuggestions(true)
							}}
							label={t('search')}
							placeholder={t('search')}
						/>

						{showSuggestions && suggestions.length > 0 && (
							<ul className="absolute top-full left-0 right-0 z-[2000] bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-auto">
								{suggestions?.map((suggest, index) => (
									<li key={index} onClick={() => handleSelect(suggest)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
										{suggest.name}
									</li>
								))}
							</ul>
						)}
					</div>

					<Button variant={'default'}>{t('search')}</Button>
				</div>
				{showReset && (
					<Button variant={'default'} onClick={handleReset}>
						{t('reset')}
					</Button>
				)}
			</div>
			{!loading && (
				<MapContainer
					className="w-full h-full"
					// center={[26.8206, 30.8025]}
					// zoom={5}
				>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					{mapCenter && <MapController center={mapCenter} />}
					<RectangleSelector onSelect={handleSelectRectangle} />
					{rectangleCoords?.[0]?.length && (
						<>
							<Polygon positions={rectangleCoords} />
							<FitBoundsController bounds={rectangleCoords} />
						</>
					)}
				</MapContainer>
			)}
		</div>
	)
}
export default Map
