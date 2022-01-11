import React from 'react';

// Importação CSS
import stylesReset from '../../assets/css/Reset.module.css';
import styles from './Header.module.css';

// Importação Imagens
import logoHeader from '../../assets/img/logo-header-github.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={stylesReset.container}>
        <img src={logoHeader} alt="Logo da GitHub" title="GitHub" />
      </div>
    </header>
  );
};

export default Header;
