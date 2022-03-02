import Head from 'next/head'
import Image from 'next/image'
import { 
  Wallet,
  Navbar,
  Dashboard,
 } from '../components';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Wallet>
        <Navbar />
        <Dashboard/>
      </Wallet>
    </div>
  )
}
