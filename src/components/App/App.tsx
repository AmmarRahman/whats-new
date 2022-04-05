import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import getApolloClient from '../../common/apolloClient';
import { store } from '../../store';
import { Layout } from '../Layout/Layout';
import { Loading } from '../Loading/Loading';
import { Routes } from '../Routes/Routes';

export const App = (): JSX.Element => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApolloClient()
      .then((apolloClient) => {
        setClient(apolloClient);
        setLoading(false);
        return apolloClient;
      })
      .catch(console.error);
  }, []);

  if (loading || !client) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Routes />
          </Layout>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
};
