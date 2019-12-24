import fetch from 'isomorphic-unfetch'
//import houses from './houses.json'
import House from '../components/House'
import Layout from '../components/Layout'
import axios from 'axios'
const Index = props => {
    const content = (<div>
        <h2>Places to stay</h2>
        <div className='houses'>
        {props.houses.map((house, index) => {
            return(
                <House key={index} {...house} />
            )
        })}
        </div>

        <style jsx>{`
        .houses {
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: 100px 100px;
            grid-gap: 40px;
        }
        `}</style>
    </div>)
    return (
        <Layout content={content} />
    )

}

Index.getInitialProps= async () => {
    const res = await axios.get('http://localhost:3000/api/houses')
    const houses = res.data
    return {
        houses
    }
}
  
  export default Index