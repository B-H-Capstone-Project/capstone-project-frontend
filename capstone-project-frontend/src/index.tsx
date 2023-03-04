/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/styles.css';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClientProvider, QueryClient} from 'react-query';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

 // Create a client
const queryClient = new QueryClient()


root.render(
	<React.StrictMode>
		<HelmetProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</Provider>
		</HelmetProvider>
	</React.StrictMode>
);
