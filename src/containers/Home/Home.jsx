import React, { useEffect, useMemo, useState } from 'react'
import Filters from '../../components/Filters/Filters';
import Card from '../../components/Card/Card';
import Layout from '../Layout/Layout';
import styles from './Home.module.scss';
import loaderGif from "../../assets/loaders/loader.gif";

const loader = 
    (<div className={styles.container__loader}>
        <span>Resources are Loading...</span>
        <img src={loaderGif} alt="loader gif"/>
    </div>)

const noDataFound = 
    (<div className={styles.container__error}>
        <h3>No data found.</h3>
        <span>Something may have went wrong... No data is displayed. Please try reloading.</span>
    </div>)

const Home = () => {
    const [ countriesData, setCountriesData ] = useState([]);
    const [ regionFilters, setRegionFilters ] = useState([]);
    const [ searchKey, setSearchKey ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false)

    const fetchCountriesData = async () => {
        try {
            setIsLoading(true);
            const data = await fetch('https://restcountries.eu/rest/v2/all');
            const json = await data.json();
            setCountriesData(json)
            setIsLoading(false)
        } catch(err){
            console.log(err)
            console.error(err)
            setCountriesData([]);
            setIsLoading(false);
        }

    }

    useEffect(() => {
        fetchCountriesData();
    },[]);


    const loadCountriesContent = useMemo(() => {
        let countriesarray = [...countriesData];
        if(searchKey){
            const cols = countriesarray[0] && Object.keys(countriesarray[0]);
            countriesarray = countriesarray.filter((row)=> {
                return cols.some(column => (row[column])? row[column].toString().toLowerCase().indexOf(searchKey.toString().toLowerCase()) >-1 : false)
            })
        }
        return countriesarray.filter(country => regionFilters.length > 0 ? regionFilters.includes(country.region) : true)
    }, [regionFilters, countriesData, searchKey])


    return (
        <Layout>
            <Filters filtersData={countriesData} 
                regionFilterOpts={(f)=>setRegionFilters(f)} 
                searchInput={(s)=>setSearchKey(s)}
            />
            <div className={styles.container__countrieslist}>
                {isLoading ? loader : loadCountriesContent.length === 0 ? noDataFound :
                    <ul className={styles.countrieslist}>
                        { loadCountriesContent.map(country => 
                            <Card cardDetailData={country} key={`${country.name}_${country.demonym}`}/>)
                        }
                    </ul>
                }
            </div>
        </Layout>
    )
}

export default Home
