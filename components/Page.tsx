import React from 'react';
import Head from 'next/head';

// const Footer: FunctionComponent = () => {
//   return 'footer';
// };

interface IPageProps {
  title: string;
}

const Page: React.FunctionComponent<IPageProps> = props => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      {props.children}
      {/* <Footer /> */}
    </>
  );
};

export default Page;
