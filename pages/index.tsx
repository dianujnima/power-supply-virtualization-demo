import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getGraphData } from '../lib/transform_data'
import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react';
import Graph from '../components/graph.component';

export default function Home({ datasets, dates }) {
  const [isLoading, setIsLoading] = useState(true);
  const [noData, setNoData] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    if (datasets && datasets.length > 0) {
      setNoData(false);
      setIsLoading(true);
    }
  }, [setNoData, setIsLoading]);

  const onChartReadyCallback = () => {
    setIsLoading(false);
  }
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      {isLoading ? (
        <div id="loader" >
          <span><img src="../images/loader.gif" alt="Loading image"></img></span>
        </div>
      ) : (<div></div>)}

      {noData ? (
        <h3 className='heading'>NO DATA</h3>
      ) : (
        <Graph datasets={datasets} dates={dates} onChartReadyCallback={onChartReadyCallback}></Graph>
      )}

      <p className='footer-text'>Demo Done By: Junaid Amin</p>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { datasets, dates } = await getGraphData();
  return {
    props: {
      datasets,
      dates
    }
  }
}