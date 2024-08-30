import styles from './link.module.css'

export const LinkComponent = ({ url, title, text, serviceIcon, onHover, onLeave }) => {
  return (
    <>
    <article className={styles.article}>
      <div className={styles['article__wrapper']}>
        <div 
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          className={styles['title__wrapper']}
        >
          <img className={styles['social__icon']} src={serviceIcon} alt="service icon" srcSet="" />
          <a href={url}>{title}</a>
        </div>
        <div>
          <p>{text}</p>
        </div>
      </div>
    </article>
    {/* <img src="../../assets/images/meaning-future-gb-4.png" alt="" /> */}
    </>
  );
}
