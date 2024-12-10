import { useCallback, useRef } from 'react';
import styles from './feed.module.css';
import defaultBgImages from '../../../images-data/bg-images.ts';
import { LinkInfo } from '../../../types.ts';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeedProps {
  links: LinkInfo[];
}

export const Feed = ({ links }: FeedProps) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const fallbackImage = defaultBgImages[0];

  const handleLinkHover = useCallback(
    (image: string) => {
      if (backgroundRef.current) {
        backgroundRef.current.style.backgroundImage = `url(${image || fallbackImage})`;
      }
    },
    [fallbackImage]
  );

  const handleLinkOnLeave = useCallback(() => {
    if (backgroundRef.current) {
      backgroundRef.current.style.backgroundImage = `url()`;
    }
  }, []);

  return (
    <main ref={backgroundRef} className={styles['bg-image']}>
      <section className={styles.wrapper}>
        {links.map((link) => (
          <article className={styles.article} key={link.id}>
            <section
              className={styles['article__wrapper']}
              onMouseEnter={() => handleLinkHover(link.imageUrl)}
              onMouseLeave={handleLinkOnLeave}
            >
              <div className={styles.article__content}>
                <div className={styles.article__image}>
                  <img
                    className={styles['article__main--image']}
                    src={link.imageUrl === undefined ? fallbackImage : link.imageUrl}
                    alt="link imge"
                  />
                  <img
                    className={styles['social__icon']}
                    src={link.serviceIcon}
                    alt="service icon"
                  />
                </div>
                <div className={styles['title__wrapper']}>
                  <p>{link.title}</p>
                  <p>{link.text}</p>
                </div>
              </div>

              <div className={styles.view__detail}>
                <Link to={`/link/${link.id}`}>Read more</Link>
                <ArrowUpRight />
              </div>
            </section>
          </article>
        ))}
      </section>
    </main>
  );
};
