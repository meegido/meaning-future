import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig } from '../firebase_config.js';
import styles from './home.module.css';
import { LinkComponent } from './link/link.component.jsx';
import defaultBgImages from '../images-data/bg-images.js'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const HomeContainer = () => {
  const [count, setCount] = useState(0);
  const [links, setlinks] = useState([]);
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const getDocuments = async () => {
      const linkCollection = collection(db, 'links');
      const linkDocuments = await getDocs(linkCollection);
      const links = linkDocuments.docs.map(doc => {
        return {id: doc.id, ...doc.data()}
      });
     
      setlinks(links);
      setCount(links.length);
    }
  
    getDocuments();
  }, [])

  const handleLinkHover = (image) => {
    const newBgImage = image;
    setBgImage(newBgImage);

    if(image === undefined) {
      var randomNumber = Math.floor(Math.random() * 4);
      setBgImage(defaultBgImages[randomNumber]);
    }
  }

  const handleLinkOnLeave = (image) => {
    if(image !== undefined) {
      setBgImage("");
    }
  }

  return (
    <main
      style={ bgImage ? { 
        backgroundImage: `url(${bgImage})`, 
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.3)'
      } : {} }
      className={styles['bg-image']}
    >
      <section className={styles.wrapper}>
        {links.map((link) =>
          <LinkComponent 
            key={link.id}
            serviceIcon={link.serviceIcon}
            url={link.url}
            title={link.title}
            text={link.text}
            onHover={() => handleLinkHover(link.imageUrl)}
            onLeave={handleLinkOnLeave}
          />
        )}
      </section>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          There is {count} url for now 😎
        </button>
      </div>
    </main>
  )
}