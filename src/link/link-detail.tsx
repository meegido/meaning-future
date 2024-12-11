import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocument } from '../shared/infrastructure/firestore-client';
import { LinkInfo } from '../types';
import styles from './link-detail.module.css';
import defaultBgImages from '../images-data/bg-images';

export const LinkDetail = () => {
  const { id } = useParams();
  const [link, setLink] = useState<LinkInfo>({} as LinkInfo);

  const defaultImage = defaultBgImages[0];

  useEffect(() => {
    (async () => {
      if (!id) {
        return;
      }

      const link = await getDocument(id);
      setLink(link);
    })();
  }, [id]);

  return (
    <section className={styles.wrapper}>
      <h1>{link.title}</h1>
      <img className={styles.main__image} src={link.imageUrl || defaultImage} alt="link image" />

      <a className={styles.link__url} href={link.url} target="_blank" rel="noopener noreferrer">
        <img src={link.serviceIcon} alt="service icon" />
        <p>{link.service}</p>
      </a>
      <div>
        <h2>What's the link about?</h2>
        <p>{link.perplexitySummary}</p>
      </div>
    </section>
  );
};
