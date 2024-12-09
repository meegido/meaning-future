import { MouseEventHandler } from 'react';
import styles from './link-preview.module.css';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface Props {
  id: string;
  title: string;
  text: string;
  serviceIcon: string;
  imageUrl: string;
  onHover: MouseEventHandler<HTMLDivElement>;
  onLeave: MouseEventHandler<HTMLDivElement>;
}

const LinkPreview = ({ id, title, text, serviceIcon, imageUrl, onHover, onLeave }: Props) => {
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
              <img className={styles['article__main--image']} src={imageUrl} alt="link imge" />
              <img
                className={styles['social__icon']}
                src={serviceIcon}
                alt="service icon"
                srcSet=""
              />
            </div>
            <div className={styles['title__wrapper']}>
              <p>{title}</p>
              <p>{text}</p>
            </div>
          </div>

          <div className={styles.view__detail}>
            <Link to={`/link/${id}`}>Read more</Link>
            <ArrowUpRight />
          </div>
        </section>
      </article>
    </>
  );
};

export default LinkPreview;
