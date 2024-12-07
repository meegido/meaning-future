import { useEffect, useState } from 'react';
import styles from './user-feed.module.css';
import defaultBgImages from '../images-data/bg-images.ts';
import { useParams } from 'react-router-dom';
import { getUserDocuments } from '../shared/infrastructure/firestore-client.tsx';
import { LinkInfo } from '../types.ts';
import LinkPreview from '../shared/components/link-preview.tsx';

export const UserFeed = () => {
  const [links, setlinks] = useState<LinkInfo[]>([]);
  const [bgImage, setBgImage] = useState('');
  const { user } = useParams();

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

  const handleLinkOnLeave = () => {
    setBgImage('');
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
            id={link.id!}
            key={link.id}
            serviceIcon={link.serviceIcon}
            title={link.title}
            text={link.text}
            onHover={() => handleLinkHover(link.imageUrl)}
            onLeave={() => handleLinkOnLeave()}
          />
        ))}
      </section>
    </main>
  );
};
