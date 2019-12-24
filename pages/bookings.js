import Layout from '../components/Layout'
import Head from 'next/head'
import axios from 'axios'

const Bookings = props => {
    const content = (
        <div>
            <Head><title>Your bookings</title></Head>
            <h2>Your Upcoming Bookings</h2>
            <div className='bookings'>
                {props.bookings.map((booking, index) => {
                    return (
                        <div className='booking' key={index}>
                            <img src={booking.house.picture} alt='House pic' />
                            <div>
                                <h2>{booking.house.title} in {booking.house.town}</h2>
                                <p>
                                    Booked from{' '}
                                    {new Date(booking.booking.startDate).toDateString()} to{' '}
                                    {new Date(booking.booking.endDate).toDateString()}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <style jsx>{`
            .bookings {
              display: grid;
              grid-template-columns: 100%;
              grid-gap: 40px;
            }

            .booking {
              display: grid;
              grid-template-columns: 30% 70%;
              grid-gap: 40px;
            }

            .booking img {
              width: 180px;
            }
          `}</style>
        </div>
    )
    return <Layout content={content} />
}

Bookings.getInitialProps = async ctx => {
    console.log('ctx: ',ctx)
    const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/api/bookings/list',
        headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
      })
    return {bookings:response.data}
}
export default Bookings