import { MouseEventHandler } from 'react';
import styles from './link-preview.module.css';

interface Props {
  url: string;
  title: string;
  text: string;
  serviceIcon: string;
  onHover: MouseEventHandler<HTMLDivElement>;
  onLeave: MouseEventHandler<HTMLDivElement>;
}

const LinkPreview = ({ url, title, text, serviceIcon, onHover, onLeave }: Props) => {
  return (
    <>
      <article className={styles.article}>
        <section
          className={styles['article__wrapper']}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        >
          <div className={styles['title__wrapper']}>
            <img
              className={styles['social__icon']}
              src={serviceIcon}
              alt="service icon"
              srcSet=""
            />
            <a href={url}>{title}</a>
          </div>
          <div>
            <p>{text}</p>
          </div>
          <div className={styles.view__detail}>
            <a href="">View link detail</a>
          </div>
        </section>
      </article>
    </>
  );
};

export default LinkPreview;
