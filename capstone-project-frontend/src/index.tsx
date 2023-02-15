/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/styles.css';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux'
import { store } from './redux/store';


const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<HelmetProvider>
    <Provider store={store}>
				<App />
			</Provider>
		</HelmetProvider>
	</React.StrictMode>
);
