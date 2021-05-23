import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Layout from "../Layout/Layout";
import styles from "./Details.module.scss";
import loaderGif from "../../assets/loaders/151.gif";

const loader = 
    (<div className={styles.container__loader}>
        <img src={loaderGif} alt="loader gif"/>
        <span>Resources are Loading...</span>
    </div>)

const Details = () => {
    const countryParams = useParams();
    const { country: code } = countryParams;

    const [ detailData, setDetailData ] = useState({flag: loaderGif});
    const [ bordersNames, setBordersNames ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false)

    const onLoadDetailData = useCallback(async () => {
        try{
            setIsLoading(true)
            const data = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}`)
            const json = await data.json();
            const bordersQuery = json.borders;
            const bordersData = await fetch(`https://restcountries.eu/rest/v2/alpha?codes=${bordersQuery.join(';')}&fields=name`)
            const bordersJson = await bordersData.json();
            setBordersNames(bordersJson);
            setDetailData(json);
            setIsLoading(false)
        }catch(err){
            console.log(err);
            console.err(err);
            setDetailData({});
            setIsLoading(false);
        }
    }, [code])

    useEffect(()=> {
        onLoadDetailData();
        return () => {
            setDetailData({})
        }
    },[onLoadDetailData])

    return (
        <Layout>
            <section className={styles.container__returnopt}>
                <Link to="/" style={{textDecoration: 'none'}}>
                    <div className={styles.container__return}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                            <path d="M17 11H9.414l2.293-2.293a.999.999 0 10-1.414-1.414L5.586 12l4.707 4.707a.997.997 0 001.414 0 .999.999 0 000-1.414L9.414 13H17a1 1 0 000-2z"/>
                        </svg>
                        <span>Back</span>
                    </div>
                </Link>
            </section>
            
            { isLoading ? loader : 
                <div className={styles.container__details}>
                    {detailData.flag ? <img src={detailData.flag} alt={`${detailData.name} flag`}></img>: loader}
                    <div className={styles.container__detailscard}>
                        <h3>{detailData.name}</h3>
                        <div className={styles.detailscard__details}>
                            <ul className={styles.ul__detailscard}>
                                <li>
                                    <h5>Native Name:</h5>
                                    <span>{detailData.nativeName}</span>
                                </li>
                                <li>
                                    <h5>Population:</h5>
                                    <span>{detailData.population}</span>
                                </li>
                                <li>
                                    <h5>Region:</h5>
                                    <span>{detailData.region}</span>
                                </li>
                                <li>
                                    <h5>Sub Region:</h5>
                                    <span>{detailData.subregion}</span>
                                </li>
                                <li>
                                    <h5>Capital:</h5>
                                    <span>{detailData.capital}</span>
                                </li>
                                <li>
                                    <h5>Top Level Domain:</h5>
                                    <span>{detailData.topLevelDomain && detailData.topLevelDomain.join().replace(',', ', ')}</span>
                                </li>
                                <li>
                                    <h5>Currencies:</h5>
                                    <span>{detailData.currencies && detailData.currencies.map(c => `${c.name}`).toString().replace(',', ', ')}</span>
                                </li>
                                <li>
                                    <h5>Languages:</h5>
                                    <span>{detailData.languages && detailData.languages.map(l => `${l.name}`).toString().replace(',', ', ')}</span>
                                </li>
                        </ul>
                        </div>
                        <div className={styles.container__details__tags}>
                            <h5>Border Countries:</h5>
                            <div className={styles.container__tagspace}>
                                {!bordersNames.length ? <span>No borders found in data</span> :
                                    bordersNames.map((border,i) => (
                                        <Link className={styles.container__tags} to={`/details/${detailData.borders && detailData.borders[0]}`} key={`${border.name}-${i}`}>
                                            <span className={styles.tags__borders}>{border && border.name}</span>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
                
            
        </Layout>
    )
}

export default Details
