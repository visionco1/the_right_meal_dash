import React, { useRef, useState, useEffect } from 'react'

type Props = {
	initialContent?: string
	onChange?: (html: string) => void
}

export default function TextEditor({ initialContent = '', onChange }: Props) {
	const editorRef = useRef<HTMLDivElement>(null)
	const [fontSize, setFontSize] = useState('16px')
	const [fontColor, setFontColor] = useState('#000000')

	useEffect(() => {
		if (editorRef.current) {
			editorRef.current.innerHTML = initialContent
		}
	}, [initialContent])

	const emitChange = () => {
		const html = editorRef.current?.innerHTML || ''
		if (onChange) onChange(html)
	}

	const execCommand = (command: string, value?: string) => {
		document.execCommand(command, false, value)
		emitChange()
	}

	const applyStyle = () => {
		const selection = window.getSelection()
		if (!selection?.rangeCount) return
		const span = document.createElement('span')
		span.style.color = fontColor
		span.style.fontSize = fontSize
		span.appendChild(selection.getRangeAt(0).extractContents())
		selection.getRangeAt(0).insertNode(span)
		emitChange()
	}

	const insertImageFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader()
			reader.onload = () => {
				execCommand('insertImage', reader.result as string)
			}
			reader.readAsDataURL(file)
		} else {
			alert('Please select a valid image file.')
		}
	}

	const insertLink = () => {
		const text = prompt('Display text:')
		const url = prompt('Link URL (https://...):')
		if (text && url && isValidUrl(url)) {
			const a = document.createElement('a')
			a.href = url
			a.textContent = text
			a.target = '_blank'
			const range = window.getSelection()?.getRangeAt(0)
			if (range) {
				range.deleteContents()
				range.insertNode(a)
				emitChange()
			}
		} else {
			alert('Invalid URL or text.')
		}
	}

	const isValidUrl = (url: string) => {
		try {
			new URL(url)
			return true
		} catch {
			return false
		}
	}

	const exportHTML = () => {
		const html = editorRef.current?.innerHTML || ''
		const blob = new Blob([html], { type: 'text/html' })
		const link = document.createElement('a')
		link.href = URL.createObjectURL(blob)
		link.download = 'document.html'
		link.click()
	}

	const fontSizes = Array.from({ length: 20 }, (_, i) => 10 + i * 2) // 10 to 48 px

	return (
		<div className="w-full font-sans border border-gray-300 rounded shadow-sm">
			{/* Toolbar */}
			<div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 border-b border-gray-300">
				<button type="button" onClick={() => execCommand('bold')} className="btn">
					B
				</button>
				<button type="button" onClick={() => execCommand('italic')} className="btn italic">
					I
				</button>
				<button type="button" onClick={() => execCommand('underline')} className="btn underline">
					U
				</button>
				<button type="button" onClick={() => execCommand('insertUnorderedList')} className="btn">
					• List
				</button>
				<button type="button" onClick={insertLink} className="btn">
					🔗 Link
				</button>

				<label className="btn cursor-pointer">
					🖼 Image
					<input type="file" accept="image/*" onChange={insertImageFromFile} className="hidden" />
				</label>

				<select
					className="pr-5 pl-2 py-1 border rounded text-sm"
					value={fontSize}
					onChange={e => {
						setFontSize(e.target.value)
						applyStyle()
					}}
				>
					{fontSizes.map(size => (
						<option key={size} value={`${size}px`}>
							{size}px
						</option>
					))}
				</select>

				<input
					type="color"
					value={fontColor}
					onChange={e => {
						setFontColor(e.target.value)
						applyStyle()
					}}
					className="w-8 h-8 p-0 border rounded"
				/>

				<button type="button" onClick={exportHTML} className="ml-auto btn">
					📥 Export
				</button>
			</div>

			{/* Editor */}
			<div
				className="min-h-[300px] p-4 bg-white focus:outline-none"
				contentEditable
				ref={editorRef}
				onInput={emitChange}
			></div>
		</div>
	)
}
