import { useEffect, useMemo, useState } from 'react';
import { LinkInfo } from '../types';
import { getDocuments } from '../shared/infrastructure/firestore-client';
import { Feed } from '../shared/components/feed/feed';
import { SearchBox } from '../shared/components/search-box';
import styles from './home-feed.module.css';

export const HomeFeed = () => {
  const [links, setLinks] = useState<LinkInfo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const links = await getDocuments();
      setLinks(links);
      setLoading(false);
    })();
  }, []);

  const filteredLinks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return links;
    return links.filter((link) => (link.perplexitySummary ?? '').toLowerCase().includes(q));
  }, [links, query]);

  const showEmptyMessage = !loading && filteredLinks.length === 0 && query.trim() !== '';

  return (
    <>
      <SearchBox onQueryChange={setQuery} placeholder="Buscar en el resumen..." />
      {showEmptyMessage ? (
        <p className={styles.empty}>No se han encontrado enlaces</p>
      ) : (
        <Feed links={filteredLinks} />
      )}
    </>
  );
};
