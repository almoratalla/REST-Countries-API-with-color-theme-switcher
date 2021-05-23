import React from 'react';
import styles from "./Layout.module.scss";

const Layout = (props) => {
    return (
        <div className={styles.container__body}>
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default Layout
