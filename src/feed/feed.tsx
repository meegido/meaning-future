import { useEffect, useState } from 'react';
import styles from './feed.module.css';
import LinkPreview from './components/link-preview.tsx';
import defaultBgImages from '../images-data/bg-images.ts';
import { getDocuments } from '../shared/infrastructure/firestore-client.js';
import { LinkInfo } from '../types.ts';

export const Feed = () => {
  const [links, setlinks] = useState<LinkInfo[]>([]);
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    (async () => {
      const links = await getDocuments();
      setlinks(links);
    })();
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
