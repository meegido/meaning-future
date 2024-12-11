import { useCallback, useEffect, useRef } from 'react';
import styles from './feed.module.css';
import { LinkInfo } from '../../../types.ts';
import LinkPreview from '../link-preview.tsx';
import defaultBgImages from '../../../images-data/bg-images.ts';

interface FeedProps {
  links: LinkInfo[];
}

export const Feed = ({ links }: FeedProps) => {
  const mainRef = useRef<HTMLDivElement>(null);

  const handleLinkHover = useCallback(
    (image: string) => {
      if (mainRef && 'current' in mainRef && mainRef.current) {
        mainRef.current.style.setProperty('--main-bg-image', `url(${image || defaultBgImages[0]})`);
        mainRef.current.style.boxShadow = 'inset 0 0 0 2000px rgba(0, 0, 0, 0.3)';
      }
    },
    [mainRef]
  );

  const handleLinkOnLeave = useCallback(() => {
    if (mainRef && 'current' in mainRef && mainRef.current) {
      mainRef.current.style.setProperty('--main-bg-image', '');
      mainRef.current.style.boxShadow = '';
    }
  }, [mainRef]);

  useEffect(() => {
    const element = mainRef && 'current' in mainRef && mainRef.current;

    if (element) {
      element.addEventListener('mouseenter', () => handleLinkHover(defaultBgImages[0]));
      element.addEventListener('mouseleave', handleLinkOnLeave);

      return () => {
        element.removeEventListener('mouseenter', () => handleLinkHover(defaultBgImages[0]));
        element.removeEventListener('mouseleave', handleLinkOnLeave);
      };
    }
  }, [mainRef, handleLinkHover, handleLinkOnLeave]);

  return (
    <main ref={mainRef} className={styles['bg-image']}>
      <section className={styles.wrapper}>
        {links.map((link) => (
          <LinkPreview
            key={link.id}
            link={link}
            onHover={() => handleLinkHover(link.imageUrl)}
            onLeave={handleLinkOnLeave}
          />
        ))}
      </section>
    </main>
  );
};
