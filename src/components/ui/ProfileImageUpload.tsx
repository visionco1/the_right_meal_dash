import { cn } from '@/utils/utils'
import { useEffect, useState } from 'react'
import { FaPen } from 'react-icons/fa'

type TParams = {
	className?: string
	title?: string
	url?: string
	upload?: boolean
}
const ProfileImageUpload = ({ className, title, url, upload = false }: TParams) => {
	const [image, setImage] = useState<any>(null)
	useEffect(() => {
		if (url) {
			setImage(url)
		}
	}, [url])
	// Handle the file input change
	const handleImageChange = (e: any) => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setImage(reader.result) // Update the image preview
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className={cn('flex justify-start items-center', className)}>
			<div className="relative w-28 h-28 bg-gray-200 border-4 border-dashed border-gray-400 rounded-full overflow-hidden">
				{/* Image preview */}
				{image ? (
					<img src={image} alt="Profile" className="w-full h-full object-cover" />
				) : (
					<div className="w-full h-full flex text-center justify-center items-center text-gray-500">
						<span>{title || 'select an image'}</span>
					</div>
				)}
				{upload && (
					<>
						{/* Edit pencil icon */}
						<div className="absolute top-[65%] right-[-10px] bg-gray-700 z-10 text-white p-2 rounded-full shadow-md cursor-pointer">
							<FaPen />
						</div>
						{/* File input button */}
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="absolute inset-0 opacity-0 cursor-pointer"
						/>
					</>
				)}
			</div>
		</div>
	)
}
export default ProfileImageUpload
