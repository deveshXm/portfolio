import Head from 'next/head';
import Expertise from '../components/Expertise';
import Intro from '../components/Intro';
import NavBar from '../components/NavBar';

export default function Home() {

  return (
    <div className='body'>
      <Head>
        <title>Portfolio</title>
        <meta name="deScription" content="Devesh Meena Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar/>
      <Intro />
      <Expertise/>
    </div>
  )
}
