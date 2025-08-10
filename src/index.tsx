import React, { Suspense } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store.js'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import 'react-international-phone/style.css'
import { Provider } from 'react-redux'
import App from './App.js'
import { LoadingPage } from './components/ui/Loading.js'

const container = document.getElementById('root')

if (container) {
	const root = createRoot(container)
	root.render(
		<Suspense fallback={<LoadingPage />}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<React.Fragment>
						<BrowserRouter basename={''}>
							<App />
						</BrowserRouter>
					</React.Fragment>
				</PersistGate>
			</Provider>
		</Suspense>
	)
}
