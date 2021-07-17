// import App from 'next/app'
import 'aos/dist/aos.css';
import * as React from 'react';
import { RecoilRoot } from 'recoil';
import 'slick-carousel/slick/slick.css';
import '../assets/fonts/fontawesome-5/css/all.css';
import '../assets/fonts/icon-font/css/style.css';
import '../assets/fonts/typography-font/typo.css';
import '../assets/scss/bootstrap.scss';
import '../assets/scss/main.scss';
import Layout from '../components/Layout';
import { GlobalProvider } from '../context/GlobalContext';

const MyApp = ({ Component, pageProps, router }) => {
  if (router.pathname.match(/sign|reset|coming/)) {
    return (
      <GlobalProvider>
        <Layout pageContext={{ layout: 'mini' }}>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    );
  } else if (
    router.pathname.match(
      /location-schedule|bracket-view|stripe-account\/confirmation/
    )
  ) {
    return <Component {...pageProps} />;
  }

  return (
    <GlobalProvider>
      <RecoilRoot>
        <Layout pageContext={{}}>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </GlobalProvider>
  );
};

export default MyApp;
