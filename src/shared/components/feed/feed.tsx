import { useState } from 'react';
import styles from './feed.module.css';
import LinkPreview from '../link-preview';
import defaultBgImages from '../../../images-data/bg-images.ts';
import { LinkInfo } from '../../../types.ts';

interface FeedProps {
  links: LinkInfo[];
}

export const Feed = ({ links }: FeedProps) => {
  const [bgImage, setBgImage] = useState('');

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
              backgroundColor: '#0e0e0ea6',
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
            imageUrl={link.imageUrl}
            onHover={() => handleLinkHover(link.imageUrl)}
            onLeave={() => handleLinkOnLeave()}
          />
        ))}
      </section>
    </main>
  );
};
