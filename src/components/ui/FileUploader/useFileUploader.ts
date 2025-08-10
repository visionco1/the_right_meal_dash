import { useEffect, useState } from 'react'
import { FileType } from './index'

export default function useFileUploader(showPreview: boolean, multi: boolean, defaultImage?: string) {
	const [selectedFiles, setSelectedFiles] = useState<FileType[]>([])
	const [defaultImg, setDefault] = useState<any>(null)

	useEffect(() => {
		setDefault(defaultImage)
	}, [defaultImage])

	useEffect(() => {
		if (defaultImg) {
			const defaultImageFile: any = {
				name: 'default-image',
				size: 0,
				type: 'image/jpeg',
				preview: defaultImage,
				formattedSize: '0 Bytes'
			}
			setSelectedFiles([defaultImageFile])
		}
	}, [defaultImg])

	const handleAcceptedFiles = (files: FileType[], callback?: (files: FileType[]) => void) => {
		let allFiles = files
		setDefault(null)
		// If the upload is single, ensure only one file is selected
		if (!multi) {
			allFiles = files.slice(0, 1) // Only allow the first file to be selected
		}

		if (showPreview) {
			allFiles.forEach(file => {
				Object.assign(file, {
					preview: file['type'].split('/')[0] === 'image' ? URL.createObjectURL(file) : null,
					formattedSize: formatBytes(file.size, 2)
				})
			})
		}

		// Replace the default image with the uploaded file if single upload
		if (multi) {
			setSelectedFiles(prevFiles => [...prevFiles, ...allFiles]) // Add new files to the existing ones
		} else {
			setSelectedFiles(allFiles) // Set only the first file if single
		}

		// Trigger the callback if provided
		if (callback) callback(allFiles)
	}

	// Format the file size
	const formatBytes = (bytes: number, decimals: number) => {
		if (bytes === 0) return '0 Bytes'
		const k = 1024
		const dm = decimals < 0 ? 0 : decimals
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
	}

	// Removes the selected file
	const removeFile = (file: FileType) => {
		const newFiles = selectedFiles.filter(f => f !== file)
		setSelectedFiles(newFiles)
	}

	// Determine whether to show the default image or the uploaded preview
	const getPreviewImage = () => {
		// Always return the preview of the first item in the selectedFiles array
		return selectedFiles.length > 0 ? selectedFiles[0].preview : defaultImage
	}

	return {
		selectedFiles,
		handleAcceptedFiles,
		removeFile,
		getPreviewImage
	}
}
