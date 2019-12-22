import houses from '../houses.json'
import Head from 'next/head'
import Modal from '../../components/Modal'
import {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import DateRangePicker from '../../components/DateRangePicker'
import {useStoreActions} from 'easy-peasy'
const House = props => {

    const [totalCost, setTotalCost] = useState(props.house.price)
    const [stayDuration, setStayDuration] = useState(1)
    const setShowLoginModal = useStoreActions(actions => actions.modals.setShowLoginModal)
    useEffect(() => {
        setTotalCost(stayDuration*props.house.price)
    })
    const content = (
        <div className="container">
            <Head>
                <title>{props.house.title}</title>
            </Head>
            <article>
                <img src={props.house.picture} width='100%' alt='House picture' />
                <p>
                    {props.house.type} - {props.house.town}
                </p>
                <p>{props.house.title}</p>
                <p>
                    {props.house.rating} ({props.house.reviewsCount})
                </p>
            </article>
            <aside>
                <h2>Add dates for prices</h2>
                <DateRangePicker setStayDuration={setStayDuration}/>
                <div>
                    <h2>Price per night</h2>
                    <p>${props.house.price}</p>
                    <h2>Total Price</h2>
                    <p>${totalCost}</p>
                    <button className="reserve" onClick={() => setShowLoginModal()}>Reserve</button>
                </div>
            </aside>

            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 60% 40%;
                    grid-gap: 30px;
                }
                aside {
                    border: 1px solid #ccc;
                    padding: 20px;
                }
            `}</style>
        </div>
    )

    return (<Layout content={content}/>)
}

House.getInitialProps = ({ query }) => {
 const {id} = query

 return {
     house: houses.filter(house => house.id === id)[0]
 }
}

export default House