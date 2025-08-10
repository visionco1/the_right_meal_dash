import { Link } from 'react-router-dom'

const BottomLink = ({ url, linkTitle, msg }: { url: string; linkTitle: string; msg: string }) => {
	return (
		<div className="text-center my-4">
			<p className="text-muted">
				{msg}
				<Link to={url} className="text-muted ms-1 link-offset-3 underline underline-offset-4">
					<b>{linkTitle}</b>
				</Link>
			</p>
		</div>
	)
}

export default BottomLink
