import {useState} from 'react'
import Head from 'next/head'
import axios from 'axios'
import Layout from '../../components/Layout'
import Router from 'next/router'
import HouseForm from '../../components/HouseForm'

const NewHouse = () => {
    const content = (<div>
        <Head><title>Add a new house</title></Head>
        <HouseForm edit={false}/>
        </div>)
    return <Layout content={content} />
}

export default NewHouse