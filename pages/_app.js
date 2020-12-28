import '@/styles/globals.scss';

import MarkdownLayout, { MarkdownLayoutProvider } from '@/layouts/markdown';

const MyApp = ({ Component, pageProps }) => {
  return (
    <MarkdownLayoutProvider>
      <MarkdownLayout>
        <Component {...pageProps} />
      </MarkdownLayout>
    </MarkdownLayoutProvider>
  );
};

export default MyApp;
