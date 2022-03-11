import React from 'react';
import Link from 'next/link';
import styles from '../../styles/listes.module.css';

export default function index(props) {

    return (
        <div className='container'>
            <h1 className={styles.listTitle}>Les listes de vocabulaires</h1>
            <ul className="list-group">
                {
                    props.array.map((type) => (
                        <li key={type.name} className="list-group-item">
                            <Link href={'/listes/'+ type.name}>
                                <a>{type.name}</a>
                            </Link>
                        </li>
                    )) 
                }
            </ul>
        </div>
    )
}

export async function getStaticProps() {
    const data = await import(`/data/listes.json`);
    const array = data.englishList;

    return {
        props: {
            array
        }
    }
}