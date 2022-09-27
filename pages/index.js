import Head from 'next/head';
import Expertise from '../components/Expertise';
import Intro from '../components/Intro';
import Work from '../components/Work';
import NavBar from '../components/NavBar';
import Experience from '../components/Experience';

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
      <Work/>
      <Experience/>
      <div className='h-screen bg-[#1a191d]'></div>
    </div>
  )
}
