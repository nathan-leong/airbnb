import axios from 'axios'
import Layout from '../../components/Layout'
import HouseForm from '../../components/HouseForm'
import Head from 'next/head'
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()

const EditHouse = props => {

    const content = (
        <div>
            <Head><title>Edit house</title></Head>
            <h2>Edit house listing</h2>
            <HouseForm edit={true} house={props.house} />
        </div>
    )

    return <Layout content={content}/>
}

EditHouse.getInitialProps = async ({query}) => {
    const {id} = query
    const response = await axios.get(`${publicRuntimeConfig.BASE_URL}${publicRuntimeConfig.PORT}/api/houses/${id}`)

    return {
        house: response.data
    }
}
export default EditHouse