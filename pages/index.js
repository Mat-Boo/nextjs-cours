import styles from '../styles/Home.module.css'
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home(props) {
  
  const [state, setState] = useState(false);

  useEffect(() => {
    newWord()
  }, [])

  const newWord = () => {
    fetch('/api/vocapi')
    .then(response => response.json())
    .then(data => setState(data))
  }

  let randomWord;
  if(state) {
    const array = state.englishList[0].data;
    randomWord = array[Math.floor(Math.random() * array.length)].en;
    console.log(randomWord)
  }

  return (
    <>
      <Head> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Titre</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.titre}>Mot au hasard</h1>
        {/* <table className={styles.tableau}>
          <tbody>
            {props.array.map(el => ( //en mettent des paranthèses à la place des {} on n'a pas besoin de mettre le return
              <tr key={el.en + el.fr}>
                <td key={el.en}>{el.en}</td>
                <td key={el.fr}>{el.fr}</td>
              </tr>
            ))}  
            </tbody>  
        </table> */}
        <button className='btn btn-primary d-block m-auto' onClick={newWord}>Get random words</button>
        <h2>{randomWord}</h2>
      </div>
    </>
  )
}


export async function getStaticProps() {
  const data = await import(`/data/vocabulary.json`);
  const array = data.vocabulary;

/*   if (array.length === 0) {
    return {
      notFound: true
    }
  } */

  if (array.length === 0) {
    return {
      redirect:
      {
        destination: "/isr"
      }
    }
  }

  return {
    props: {
      array: array //array tout seul est possible car porte le même nom
    }
  }
}