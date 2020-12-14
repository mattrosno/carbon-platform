import '../styles/globals.scss';

import Layout, { LayoutProvider } from '../components/layout';

const MyApp = ({ Component, pageProps }) => {
  return (
    <LayoutProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LayoutProvider>
  );
};

export default MyApp;
