import React, { useEffect, useState } from 'react';

import styles from "./Filters.module.scss";

const Filters = ({ filtersData:data, regionFilterOpts, searchInput }) => {
    const [ isRegionOptionsShown, setIsRegionOptionsShown] = useState(false);
    const [ regionOptions, setRegionOptions ] = useState([]);
    const [ selectedRegionOptions, setSelectedRegionOptions ] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    useEffect(() => {
        let regions = []
        data.forEach(country => {
            if(country.region && !regions.includes(country.region)){
                regions.push(country.region)
            }
        })
        setRegionOptions(regions);
        setSelectedRegionOptions(regions);

    },[data])


    const selectedRegionOptionsHandler = (e,opt) => {
        (!selectedRegionOptions.includes(opt)) 
            ? setSelectedRegionOptions([...selectedRegionOptions, opt])            
            : setSelectedRegionOptions(selectedRegionOptions.filter(selectedregion => selectedregion !== opt))
        e.preventDefault()
    }

    const selectedAllRegionsHandler = (e) => {
        (selectedRegionOptions.sort().toString() === regionOptions.sort().toString()) ? setSelectedRegionOptions([]) : setSelectedRegionOptions([...regionOptions]);
        e.preventDefault()
    }

    const submitRegionFilterHandler = () =>{
        setIsRegionOptionsShown(!isRegionOptionsShown);
        regionFilterOpts(selectedRegionOptions)
	}

    
	const onInputSearchKeyHandler = (e) => {
		searchInput(e.target.value);
		setSearchKey(e.target.value);
	}

    return (
        <section className={styles.container__filters}>
            <div className={styles.container__search}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path d="M9.516 14.016q1.875 0 3.188-1.313t1.313-3.188-1.313-3.188-3.188-1.313-3.188 1.313-1.313 3.188 1.313 3.188 3.188 1.313zm6 0l4.969 4.969-1.5 1.5-4.969-4.969v-.797l-.281-.281q-1.781 1.547-4.219 1.547-2.719 0-4.617-1.875T3.001 9.516t1.898-4.617 4.617-1.898 4.594 1.898 1.875 4.617q0 .984-.469 2.227t-1.078 1.992l.281.281h.797z"/>
                </svg>
                <label htmlFor="search">Search</label>
                <input type="text" name="search" id="search"
                    placeholder={"Search for a country..."}
                    value={searchKey}
                    onChange={onInputSearchKeyHandler}
                />
            </div>
            <div className={styles.container__selectfilter}>
                <div className={styles.selectbox}
                    onClick={()=> setIsRegionOptionsShown(!isRegionOptionsShown)}
                >
                    <label htmlFor="filter">Filter by Region</label>
                    <select className={styles.overlap} placeholder="Filter by Region" name="filter" id="filter">
                    </select>
                    <div className={styles.overselect}></div>
                </div>
                <div className={`${styles.checkboxes}`}
                    style={{display: isRegionOptionsShown ? 'block':'none'}}
                >
                    <div className={styles.checkboxes__optgroup}>
                        <label 
                            htmlFor="region-showall"
                            onClick={(e)=> selectedAllRegionsHandler(e)}
                        >
                            <input type="checkbox" 
                                id="region-showall" value={"*"} 
                                checked={(selectedRegionOptions.sort().toString() === regionOptions.sort().toString())}
                                onChange={() => {}}
                            />
                            <span>(Show All)</span>
                        </label>

                        {regionOptions.sort().map((opt, i) => (
                            <label 
                                htmlFor={opt} key={`region_${opt}-${i}`}
                                onClick={e => selectedRegionOptionsHandler(e, opt)}
                            >
                                <input type="checkbox" 
                                    id={opt} value={opt}
                                    onChange={()=> {}}
                                    checked={(selectedRegionOptions.includes(opt))}
                                />
                                <span>{opt}</span>
                            </label>
                        ))}
                    </div>
                    <div className={styles.filtersubmit}>
                        <label htmlFor="regionsubmit" 
                            onClick={()=>{ submitRegionFilterHandler()}}
                        >
                            <input type="button" value="Done" id="regionsubmit" />
                        </label>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Filters
