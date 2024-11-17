import { MouseEventHandler } from 'react';
import styles from './link-preview.module.css';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
  title: string;
  text: string;
  serviceIcon: string;
  onHover: MouseEventHandler<HTMLDivElement>;
  onLeave: MouseEventHandler<HTMLDivElement>;
}

const LinkPreview = ({ id, title, text, serviceIcon, onHover, onLeave }: Props) => {
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
            <p>{title}</p>
          </div>
          <div>
            <p>{text}</p>
          </div>
          <div className={styles.view__detail}>
            <Link to={`/link/${id}`}>View link detail</Link>
          </div>
        </section>
      </article>
    </>
  );
};

export default LinkPreview;
