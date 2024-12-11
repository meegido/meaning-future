import styles from './link-preview.module.css';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { LinkInfo } from '../../types';
import defaultBgImages from '../../images-data/bg-images.ts';
import { MouseEventHandler } from 'react';

interface Props {
  link: LinkInfo;
  onHover: MouseEventHandler<HTMLDivElement>;
  onLeave: MouseEventHandler<HTMLDivElement>;
}

const LinkPreview = ({ link, onHover, onLeave }: Props) => {
  return (
    <>
      <article className={styles.article}>
        <section
          className={styles['article__wrapper']}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        >
          <div className={styles.article__content}>
            <div className={styles.article__image}>
              <img
                className={styles['article__main--image']}
                src={link.imageUrl || defaultBgImages[0]}
                alt="link imge"
                aria-label="link image"
              />
              <img
                className={styles['social__icon']}
                src={link.serviceIcon}
                alt="service icon"
                aria-label="service icon"
              />
            </div>
            <div className={styles['title__wrapper']}>
              <h2>{link.title}</h2>
              <p>{link.text}</p>
            </div>
          </div>

          <div className={styles.view__detail}>
            <Link to={`/link/${link.id}`}>Read more</Link>
            <ArrowUpRight />
          </div>
        </section>
      </article>
    </>
  );
};

export default LinkPreview;
