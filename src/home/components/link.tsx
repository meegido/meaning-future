import { MouseEventHandler } from 'react';
import styles from './link.module.css'

interface Props {
  url: string;
  title: string;
  text: string;
  serviceIcon: string;
  onHover: MouseEventHandler<HTMLDivElement>;
  onLeave: MouseEventHandler<HTMLDivElement>;
}

export const Link = ({ url, title, text, serviceIcon, onHover, onLeave }: Props) => {
  return (
    <>
    <article className={styles.article}>
      <div
        className={styles['article__wrapper']}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}>
        <div className={styles['title__wrapper']}>
          <img className={styles['social__icon']} src={serviceIcon} alt="service icon" srcSet="" />
          <a href={url}>{title}</a>
        </div>
        <div>
          <p>{text}</p>
        </div>
      </div>
    </article>
    </>
  );
}
