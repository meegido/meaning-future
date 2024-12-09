import { NavLink } from 'react-router-dom';
import styles from './header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>
        <NavLink to="/">Meaning future</NavLink>
      </h1>
    </header>
  );
};
