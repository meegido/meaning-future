import styles from './link.module.css'

export const LinkComponent = ({ url, title, text, serviceIcon, onHover }) => {
  return (
    <article className={styles.article}>
      <div>
        <h3 onMouseEnter={onHover}>
          <i src={serviceIcon} alt="service icon" srcSet="" />
          <a href={url}>{title}</a>
        </h3>
        <div>
          <p>{text}</p>
        </div>
      </div>
    </article>
  );
}
