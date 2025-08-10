import React, { ReactNode } from 'react'

const ContentWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<div className="card min-h-[70vh] relative">
			<div className="p-6">{children}</div>
		</div>
	)
}

export default ContentWrapper
