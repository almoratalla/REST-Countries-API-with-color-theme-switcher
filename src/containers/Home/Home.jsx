import React from 'react'
import Filters from '../../components/Filters/Filters';

import styles from './Home.module.scss';

const Home = () => {
    return (
        <div className={styles.container__home}>
            <main>
                <Filters/>
                <div>
                    <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    </ul>
                </div>
            </main>
        </div>
    )
}

export default Home
