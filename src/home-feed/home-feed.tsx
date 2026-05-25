import { useEffect, useMemo, useState } from 'react';
import { LinkInfo } from '../types';
import { getDocuments } from '../shared/infrastructure/firestore-client';
import { Feed } from '../shared/components/feed/feed';
import { SearchBox } from '../shared/components/search-box';

export const HomeFeed = () => {
  const [links, setLinks] = useState<LinkInfo[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    (async () => {
      const links = await getDocuments();
      setLinks(links);
    })();
  }, []);

  const filteredLinks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return links;
    return links.filter((link) =>
      (link.perplexitySummary ?? '').toLowerCase().includes(q)
    );
  }, [links, query]);

  return (
    <>
      <SearchBox onQueryChange={setQuery} placeholder="Buscar en el resumen..." />
      <Feed links={filteredLinks} />
    </>
  );
};
