import React, { useState } from 'react';
import styles from './Header.module.scss';

import moonIconDarkFill from '../../assets/images/svg/moon-fill.svg'
import moonIconLightOutline from '../../assets/images/svg/moon-outline-light.svg'
import { Link } from 'react-router-dom';

const Header = () => {
    const [darkTheme, setDarkTheme] = useState(false)

    const themeSwitchHandler = (e) => {
        let themeSwitch;
        if(e.target.checked === true){
            themeSwitch = ['data-theme', 'dark']
            setDarkTheme(() => true);
        } else {
            themeSwitch = ['data-theme', 'light'];
            setDarkTheme(() => false);
        }
        document.documentElement.setAttribute(...themeSwitch)
    }

    return (
        <div className={styles.container__header}>
            <header className={styles.header}>
                <Link to="/" style={{textDecoration: 'none'}}>
                    <h1 className={styles.header__logobrand}>Where in the world?</h1>
                </Link>
                <div className={styles.header__themeswitch}>
                    <input type="checkbox" id="theme" name="theme" onChange={themeSwitchHandler}/>
                    <label htmlFor="theme">
                        <img src={darkTheme ? moonIconDarkFill : moonIconLightOutline} alt="Theme switcher icon"/>
                        <span>Dark Mode</span>
                    </label> 
                </div>
            </header>
      </div>
    )
}

export default Header
