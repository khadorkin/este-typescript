import { FunctionComponent } from 'react';
import Head from 'next/head';

interface IPageProps {
  title: string;
}

const Page: FunctionComponent<IPageProps> = props => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      {props.children}
    </>
  );
};

export default Page;
