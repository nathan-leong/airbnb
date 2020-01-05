import House from '../components/House'
import Layout from '../components/Layout'
import axios from 'axios'
import getConfig from 'next/config'
import {useState} from 'react'
const {publicRuntimeConfig} = getConfig()
const Index = props => {
    const [expandFilterMenu, setExpandFilterMenu] = useState(false)
    const [displayedHouses, setDisplayedHouses] = useState(props.houses)
    const [locationFilter, setLocationFilter] = useState('')
    const handleExpandFilters = () => {
        setExpandFilterMenu(!expandFilterMenu)
    }
    const applyFilter = () => {
        setDisplayedHouses(props.houses.filter(house => house.town.toLowerCase() == locationFilter.toLowerCase()))
    }
    const clearFilter = () => {
        setDisplayedHouses(props.houses)
    }
    const content = (<div>
        <h2>Check out these places to stay !!!</h2>
        <div className='filter-container'>
            {expandFilterMenu && (
                <div className='filter-menu'>
                    <input placeholder='Location' onChange={e => setLocationFilter(e.target.value)} type='text'/>
                    <div className='filterButtonsBlock'>
                        <button style={{width: '100px'}} onClick={() => applyFilter()}>Filter</button>
                        <button className='clearFilterButton' style={{width: '100px'}} onClick={() => clearFilter()}>Clear Filters</button>
                    </div>
                </div>
            )}
            <button onClick={() => handleExpandFilters()}>{expandFilterMenu ? 'Collapse' : 'Expand'} Filters</button>
        </div>
        <div className='houses-container'>
        {displayedHouses.map((house, index) => {
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
        img {
            max-width:90%;
        }
        .filter-menu {
            margin: 20px;
        }
        input {
            30px;
        }
        .clearFilterButton {
            color: rgb(255, 90, 95);
            border: 2px solid rgb(255, 90, 95);
            background-color: white;
            margin-left: 10px;
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