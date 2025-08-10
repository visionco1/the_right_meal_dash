import React from 'react'
import AllRoutes from './routes/Routes'
import { Bounce, ToastContainer } from 'react-toastify'
// styles
import 'gridjs/dist/theme/mermaid.min.css'
import './index.scss'
// lang
import '@/i18n/i18n'
import { useSetLang } from '@/i18n/i18n'
const App = () => {
	useSetLang()
	return (
		<React.Fragment>
			<AllRoutes />
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={true}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				transition={Bounce}
			/>
		</React.Fragment>
	)
}

export default App
