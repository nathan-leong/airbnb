import axios from 'axios'
import Layout from '../../components/Layout'
import HouseForm from '../../components/HouseForm'
import Head from 'next/head'
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
    const response = await axios.get(`http://localhost:3000/api/houses/${id}`)

    return {
        house: response.data
    }
}
export default EditHouse