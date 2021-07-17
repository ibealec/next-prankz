import AOS from 'aos';
import Head from 'next/head';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import imgFavicon from '../../assets/favicon.png';
import GlobalContext from '../../context/GlobalContext';
import Footer from '../Footer';
import Header from '../Header';


const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 9999999999;
  opacity: 1;
  visibility: visible;
  transition: all 1s ease-out 0.5s;
  &.inActive {
    opacity: 0;
    visibility: hidden;
  }
`;

const Layout = ({ children, pageContext }) => {
  const gContext = useContext(GlobalContext);

  const [visibleLoader, setVisibleLoader] = useState(true);

  useEffect(() => {
    AOS.init({ once: true });
    setVisibleLoader(false);
  }, []);

  // Navbar style based on scroll
  const eleRef = useRef();

  useEffect(() => {
    window.addEventListener(
      'popstate',
      function (event) {
        // The popstate event is fired each time when the current history entry changes.
        gContext.closeOffCanvas();
      },
      false
    );
    window.addEventListener(
      'pushState',
      function (event) {
        // The pushstate event is fired each time when the current history entry changes.
        gContext.closeOffCanvas();
      },
      false
    );

    return () => {};
  }, [gContext]);

  if (pageContext.layout === 'mini') {
    return (
      <>
        <Head>
          <title>MyYouthSports</title>
          <link rel="icon" type="image/png" href={imgFavicon} />
          <body data-theme={gContext.theme.bodyDark ? 'dark' : 'light'} />
        </Head>
        <Loader id="loading" className={visibleLoader ? '' : 'inActive'} />

        <div className="site-wrapper overflow-hidden" ref={eleRef}>
          {children}
        </div>

      </>
    );
  }

  return (
    <>
      <>
        <Head>
          <title>MyYouthSports</title>
          <link rel="icon" type="image/png" href={imgFavicon} />
          <body data-theme={gContext.theme.bodyDark ? 'dark' : 'light'} />
        </Head>
        <Loader id="loading" className={visibleLoader ? '' : 'inActive'} />
        <div className="site-wrapper overflow-hidden" ref={eleRef}>
          <Header />
          {children}
          <Footer
            className={gContext.theme.footerClassName}
            style={gContext.theme.footerStyle}
          />
        </div>

      </>
    </>
  );
};

export default Layout;
