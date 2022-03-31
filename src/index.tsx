import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { AuthOptions, createAuthLink } from 'aws-appsync-auth-link';
<<<<<<< HEAD
=======
import { enableAllPlugins } from 'immer';
>>>>>>> 1d74049d3d07b66437b9a336bc29f2ec8a2bdd05
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/index.scss';
import { App } from './components/App/App';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const url = process.env.REACT_APP_API_URL || 'http://localhost:4000/graphql';
const apiKey = process.env.REACT_APP_API_KEY || 'local';
const region = 'eu-west-1';
const auth: AuthOptions = {
  type: 'API_KEY',
  apiKey,
};

const httpLink = createHttpLink({ uri: url });

const link = ApolloLink.from([createAuthLink({ url, region, auth }), httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

<<<<<<< HEAD
=======
enableAllPlugins();
>>>>>>> 1d74049d3d07b66437b9a336bc29f2ec8a2bdd05
// If you want to start measuring performance in your app, pass a function to log results (for
// example: reportWebVitals(console.log)) or send to an analytics endpoint. Learn more:
// https://bit.ly/CRA-vitals
reportWebVitals();
// If you want your app to work offline and load faster, you can change unregister() to register()
// below. Note this comes with some pitfalls. Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

ReactDOM.render(
  <StrictMode>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ErrorBoundary>
  </StrictMode>,
  document.getElementById('app')
);
