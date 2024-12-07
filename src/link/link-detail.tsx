import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocument } from '../shared/infrastructure/firestore-client';
import { LinkInfo } from '../types';
import styles from './link-detail.module.css';

export const LinkDetail = () => {
  const { id } = useParams();
  const [link, setLink] = useState<LinkInfo>({} as LinkInfo);

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
    <section className={styles.link__wrapper}>
      <h1>{link.title}</h1>
      <p>{link.perplexitySummary}</p>
    </section>
  );
};
