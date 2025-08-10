import { ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type TItem = { name: string; to: string }
interface PageTitleProps {
	subName?: string
	title: string
	addedChild?: ReactNode
	items?: TItem[]
}

const PageBreadcrumb = ({ title, addedChild, items }: PageTitleProps) => {
	const { t } = useTranslation()
	const breadcrumbItems = [
		{
			name: t('The Right Meal'),
			to: '/'
		},
		...(items || [])
	]
	return (
		<>
			<Helmet>
				<title className="first-letter:uppercase">{title} | The Right Meal</title>
			</Helmet>
			{items && (
				<div className="flex justify-between items-center mb-6">
					<div className="flex gap-4">
						<h4 className="text-slate-900 dark:text-slate-200 text-xl font-bold first-letter:uppercase">{title}</h4>
						{addedChild}
					</div>
					<div className="md:flex hidden items-center gap-2.5 font-semibold">
						{breadcrumbItems?.map((item: any, i: number) => (
							<div className="flex items-center gap-2" key={i}>
								{i != 0 && <i className="ri-arrow-right-s-line text-base text-slate-400 rtl:rotate-180" />}
								<Link to={item?.to} className="text-sm first-letter:uppercase font-medium text-slate-700 dark:text-slate-400">
									{item?.name}
								</Link>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	)
}

export default PageBreadcrumb
