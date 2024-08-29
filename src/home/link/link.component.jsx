import styles from './link.module.css'

export const LinkComponent = ({ url, title, text, serviceIcon, onHover }) => {
  return (
    <article className={styles.article}>
      <div>
        <div onMouseEnter={onHover}>
          <img src={serviceIcon} alt="service icon" srcSet="" />
          <a href={url}>{title}</a>
        </div>
        <div>
          <p>{text}</p>
        </div>
      </div>
    </article>
  );
}
