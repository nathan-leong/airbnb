import Link from 'next/link'

const House = props => (
    <Link href={`/houses/${props.id}`}>
        <a>
            <img src={props.picture} alt='House Picture' />
            <p>
                {props.type} - {props.town}
            </p>
            <p>{props.title}</p>
        </a>
    </Link>
)

export default House