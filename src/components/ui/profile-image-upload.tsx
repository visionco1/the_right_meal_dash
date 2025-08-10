import React, { useEffect, useState } from 'react'

interface ProfileImageUploadProps {
	className?: string
	imgWidth?: string
	title?: string
	url?: string
	onChange: (file: File | null) => void
}

const ProfileImageUpload = ({ className, imgWidth, title, url, onChange }: ProfileImageUploadProps) => {
	const [image, setImage] = useState<string | null>(url || null)

	useEffect(() => {
		if (url) setImage(url)
	}, [url])

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setImage(reader.result as string)
			}
			reader.readAsDataURL(file)
			onChange(file)
		}
	}

	const handleRemoveImage = () => {
		setImage(null)
		onChange(null)
	}

	return (
		<div className={`flex flex-col  justify-start items-center ${className}`}>
			{title && <label className="text-gray-700 text-md">{title}</label>}
			<div className="relative max-w-24">
				{image && (
					<button type="button" onClick={handleRemoveImage} className="text-center z-10 w-6 h-6 text-xs font-bold absolute top-0 right-0 bg-gray-900 text-white rounded-full">
						X
					</button>
				)}
				<div className={`${imgWidth || 'w-24 h-24'} relative bg-gray-200 border-4 border-dashed overflow-hidden border-gray-400 rounded-full`}>
					{image ? (
						<img src={image} alt="Profile" className="w-full h-full object-cover" />
					) : (
						<div className="w-full h-full flex text-center justify-center items-center text-wrap text-gray-400 text-[14px]">
							<span>{title || 'Select an image'}</span>
						</div>
					)}
					<input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
				</div>
			</div>
		</div>
	)
}

export default ProfileImageUpload
