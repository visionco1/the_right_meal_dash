import Dropzone from 'react-dropzone'
import useFileUploader from './useFileUploader'
import React from 'react'
import { useTranslation } from 'react-i18next'

export interface FileType extends File {
	preview?: string
	formattedSize?: string
}

interface FileUploaderProps extends ChildrenProps {
	onFileUpload?: (files: FileType[]) => void
	showPreview?: boolean
}

type ChildrenProps = {
	icon?: string
	text?: string
	textClass?: string
	extraText?: string
	classname?: string
	setter?: any
	value?: any
	multi?: boolean
	defaultImage?: string
}

const FileUploader = ({ showPreview = true, onFileUpload, icon, text, value, multi = false, defaultImage }: FileUploaderProps) => {
	const { selectedFiles, handleAcceptedFiles, removeFile } = useFileUploader(showPreview, multi, defaultImage)
	const { t } = useTranslation()
	return (
		<>
			<Dropzone onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles, onFileUpload)} multiple={multi}>
				{({ getRootProps, getInputProps }) => (
					<div className="dropzone flex justify-center items-center" {...getRootProps()} role="button" aria-label="Upload files" tabIndex={0}>
						<div className="fallback">
							<input {...getInputProps()} name="file" type="file" multiple={multi} aria-label="Select file(s)" />
						</div>
						<div className="dz-message needsclick">
							<div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
								<i className="ri-upload-cloud-line text-4xl text-gray-300 dark:text-gray-200"></i>
							</div>
							<h5 className="text-xl text-gray-600 dark:text-gray-200">{text}</h5>
							<p className="text-sm text-gray-500 dark:text-gray-400">{multi ? t('YouCanSelectMultipleFiles') : t('YouCanSelectOnlyOneFile')}</p>
						</div>
					</div>
				)}
			</Dropzone>

			{showPreview && selectedFiles.length > 0 && (
				<div>
					{multi
						? selectedFiles.map((file, idx) => (
								<React.Fragment key={idx}>
									<div className="border rounded-md border-gray-200 p-3 mb-2 dark:border-gray-600 mt-2">
										<div className="float-right">
											<span className="btn btn-link" aria-label={`Remove ${file.name}`} onClick={() => removeFile(file)}>
												<i className="ri-close-line text-lg"></i>
											</span>
										</div>

										<div className="flex items-center gap-3">
											{file.preview && <img data-dz-thumbnail="" className="h-12 w-12 rounded bg-light" style={{ objectFit: 'cover' }} alt={file.name} src={file.preview} />}
											{!file.preview && <span className="flex items-center justify-center bg-primary/10 text-primary font-semibold rounded-md w-12 h-12">{file.type.split('/')[0]}</span>}
											<div>
												<span className="font-semibold">{file.name}</span>
												<p>{file.formattedSize}</p>
											</div>
										</div>
									</div>
								</React.Fragment>
							))
						: selectedFiles.length > 0 && (
								<div className="border rounded-md border-gray-200 p-3 mb-2 dark:border-gray-600 mt-2">
									<div className="float-right">
										<span className="btn btn-link" aria-label={`Remove ${selectedFiles[0].name}`} onClick={() => removeFile(selectedFiles[0])}>
											<i className="ri-close-line text-lg"></i>
										</span>
									</div>

									<div className="flex items-center gap-3">
										{selectedFiles[0].preview && (
											<img data-dz-thumbnail="" className="h-12 w-12 rounded bg-light" style={{ objectFit: 'cover' }} alt={selectedFiles[0].name} src={selectedFiles[0]?.preview} />
										)}
										{!selectedFiles[0].preview && (
											<span className="flex items-center justify-center bg-primary/10 text-primary font-semibold rounded-md w-12 h-12">{selectedFiles[0]?.type?.split('/')[0]}</span>
										)}
										<div>
											<span className="font-semibold">{selectedFiles[0]?.name}</span>
											<p>{selectedFiles[0]?.formattedSize}</p>
										</div>
									</div>
								</div>
							)}
				</div>
			)}
		</>
	)
}

export { FileUploader }
