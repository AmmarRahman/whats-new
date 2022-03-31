import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { AuthOptions, createAuthLink } from 'aws-appsync-auth-link';

const url = process.env.REACT_APP_API_URL || 'http://localhost:4000/graphql';
const apiKey = process.env.REACT_APP_API_KEY || 'local';
const region = 'eu-west-1';
const SCHEMA_VERSION = '1';
const SCHEMA_VERSION_KEY = 'apollo-schema-version';
const auth: AuthOptions = {
  type: 'API_KEY',
  apiKey,
};

const getApolloClient = async () => {
  const httpLink = createHttpLink({ uri: url, useGETForQueries: true });
  const link = ApolloLink.from([createAuthLink({ url, region, auth }), httpLink]);

  const cache = new InMemoryCache();

  //   const persistor = new CachePersistor({
  //     cache,
  //     storage: new LocalStorageWrapper(window.localStorage),
  //   });

  //   const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY);

  //   if (currentVersion === SCHEMA_VERSION) {
  //     await persistor.restore();
  //   } else {
  //     await persistor.purge();
  //     window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
  //   }

  return new ApolloClient({ link, cache });
};

export default getApolloClient;
