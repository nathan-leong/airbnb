import Head from 'next/head'
import Layout from '../../components/Layout'
import DateRangePicker from '../../components/DateRangePicker'
import {useStoreActions, useStoreState} from 'easy-peasy'
import axios from 'axios'

const House = props => {

    const setShowLoginModal = useStoreActions(actions => actions.modals.setShowLoginModal)
    const user = useStoreState(state => state.user.user)
    const totalNights = useStoreState(state => state.bookingDates.totalNights)
    const totalCost = totalNights*props.house.price

    const bookHouse = () => {

    }

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
                {props.house.reviewsCount > 0 && (
                    <div className='reviews'>
                    <h3>{props.house.reviewsCount} Reviews</h3>

                    {props.house.reviews.map((review, index) => {
                        return (
                            <div key={index}>
                                <p>{new Date(review.createdAt).toDateString()}</p>
                                <p>{review.comment}</p>
                            </div>
                        )
                    })}
                    </div>
                )}
            </article>
            <aside>
                <h2>Add dates for prices</h2>
                <DateRangePicker/>
                <div>
                    <h2>Price per night</h2>
                    <p>${props.house.price}</p>
                    <h2>Total Price</h2>
                    <p>${totalCost}</p>
                    <button className="reserve" onClick={
                        user ? () => bookHouse() : () => setShowLoginModal()}>
                        {user ? 'Reserve' : 'Login to Reserve' }
                    </button>
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

House.getInitialProps = async ({ query }) => {
    const {id} = query
    const res = await axios.get(`http://localhost:3000/api/houses/${id}`)
    return {
        house: res.data
    }
}

export default House