import React from 'react'
import { Link } from 'react-router-dom'

import styles from "./Card.module.scss"

const Card = ({ cardDetailData }) => {
    return (
        <Link to={`/details/${cardDetailData.alpha3Code.toLowerCase()}`} style={{ textDecoration: 'none' }}>
            <li className={styles.li__container}>
                <div className={styles.li__countrycard}>
                    <div className={styles.countrycard__img }>
                        <img src={cardDetailData.flag} alt={`${cardDetailData.demonym} flag`} />
                    </div>
                    <div className={styles.countrycard__details}>
                        <h3>{cardDetailData.name}</h3>
                        <ul className={styles.countrycard__details__sub}>
                            <li>
                                <h5>Population:</h5>
                                <span>{cardDetailData.population}</span>
                            </li>
                            <li>
                                <h5>Region:</h5>
                                <span>{cardDetailData.region}</span>
                            </li>
                            <li>
                                <h5>Capital:</h5>
                                <span>{cardDetailData.capital}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        </Link>
        
    )
}

export default Card
