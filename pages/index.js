import House from '../components/House'
import Layout from '../components/Layout'
import axios from 'axios'
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()
const Index = props => {
    const content = (<div>
        <h2>Check out these places to stay !!!</h2>
        <div className='houses-container'>
        {props.houses.map((house, index) => {
            return(
                <div className='house' key={index}>
                    <House {...house} />
                </div>
            )
        })}
        </div>

        <style jsx global>{`
        .houses-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }
        .house {
            margin: 20px;
        }
        .houses-container img {
            max-height: 200px;
        }
        `}</style>
    </div>)
    return (
        <Layout content={content} />
    )

}

Index.getInitialProps= async () => {
    const res = await axios.get(publicRuntimeConfig.BASE_URL + publicRuntimeConfig.PORT + '/api/houses')
    const houses = res.data
    return {
        houses
    }
}
  
  export default Index