import React from 'react';

// Importação do CSS
import styles from './Login.module.css';
import stylesReset from '../../assets/css/Reset.module.css';

// Importação Imagem
import logoGitHub from '../../assets/img/logo-login-github-white.png';

// Variáveis Globais
const GITHUB_CLIENT_ID = '9d5c393f001ae3f8ec05';
const GITHUB_REDIRECT_URL = 'http://localhost:9000/login/github/callback';

const Login = () => {
  return (
    <div className={styles.backgroundLogin}>
      <div className={styles.container}>
        <div className={styles.cardLogin}>
          <img src={logoGitHub} alt="Logo GitHub Branca" title="Logo GitHub" />
          <h1>Login</h1>

          <a
            href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}`}
            className={`${stylesReset.transition}`}
          >
            Entrar com GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
