import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig } from '../firebase-config.ts';
import styles from './user-feed.module.css';
import { DocumentData } from 'firebase/firestore/lite';
import defaultBgImages from '../images-data/bg-images.ts';
import LinkPreview from './components/link-preview.tsx';
import { LinkInfo } from './components/link.types.ts';
import { useParams } from 'react-router-dom';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const UserFeed = () => {
  const [links, setlinks] = useState<LinkInfo[]>([]);
  const [bgImage, setBgImage] = useState('');
  const { user } = useParams();

  const getUserDocuments = async (user: string) => {
    const linkCollection = collection(db, 'links');
    const linkDocuments = await getDocs(linkCollection);
    return linkDocuments.docs
      .map<LinkInfo>((doc: DocumentData) => {
        return { id: doc.id, ...doc.data() };
      })
      .filter((linkInfo: LinkInfo) => linkInfo.userName === user);
  };

  useEffect(() => {
    (async () => {
      const userLinks = await getUserDocuments(user!);
      setlinks(userLinks);
    })();
  }, [user]);

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
