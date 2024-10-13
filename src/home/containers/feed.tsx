import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig } from '../../firebase-config.ts';
import styles from './feed.module.css';
import LinkPreview from '../components/link-preview.tsx';
import defaultBgImages from '../../images-data/bg-images.ts';
import { LinkInfo } from '../components/link.types.js';
import { DocumentData } from 'firebase/firestore/lite';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const Feed = () => {
  const [count, setCount] = useState(0);
  const [links, setlinks] = useState<LinkInfo[]>([]);
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    const getDocuments = async () => {
      const linkCollection = collection(db, 'links');
      const linkDocuments = await getDocs(linkCollection);
      const links = linkDocuments.docs.map<LinkInfo>((doc: DocumentData) => {
        return { id: doc.id, ...doc.data() };
      });

      setlinks(links);
      setCount(links.length);
    };

    getDocuments();
  }, []);

  const handleLinkHover = (image: string) => {
    if (image === undefined) {
      const randomNumber = Math.floor(Math.random() * 4);
      setBgImage(defaultBgImages[randomNumber]);
      return;
    }
    const newBgImage = image;
    setBgImage(newBgImage);
  };

  const handleLinkOnLeave = (image: string) => {
    if (image !== undefined) {
      setBgImage('');
    }
  };

  return (
    <main
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.3)',
            }
          : {}
      }
      className={styles['bg-image']}
    >
      <section className={styles.wrapper}>
        {links.map((link) => (
          <LinkPreview
            key={link.id}
            serviceIcon={link.serviceIcon}
            url={link.url}
            title={link.title}
            text={link.text}
            onHover={() => handleLinkHover(link.imageUrl)}
            onLeave={() => handleLinkOnLeave(link.imageUrl)}
          />
        ))}
      </section>
    </main>
  );
};
