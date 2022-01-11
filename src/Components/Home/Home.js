import React from 'react';

// Importação Componentes
import Header from '../Header/Header.js';
import Input from '../Input/Input.js';
import DataUser from '../DataUser/DataUser.js';

// Importação CSS
import stylesReset from '../../assets/css/Reset.module.css';
import styles from './Home.module.css';

const Home = () => {
  const [user, setUser] = React.useState('');
  const [error, setError] = React.useState('');
  const [dataUser, setDataUser] = React.useState('');

  const { pathname } = window.location;

  React.useEffect(() => {
    const urlUser = pathname.substring(1);
    if (urlUser) {
      fetch(`https://api.github.com/users/${urlUser}`)
        .then((response) => response.json())
        .then((data) => setDataUser(data));
      setUser(urlUser);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (validateInput(user)) {
      const response = await (
        await fetch(`https://api.github.com/users/${user}`)
      ).json();
      setDataUser(response);
    }
  }

  function handleBlur({ target }) {
    validateInput(target.value);
    setDataUser('');
  }

  function validateInput(value) {
    if (value.length == 0) {
      setError('Preencha um valor');
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  return (
    <>
      <Header />

      <section className={styles.sectionInfo}>
        <div className={stylesReset.container}>
          <div className={styles.contentInfo}>
            <h1>Portal de Pesquisa da GitHub</h1>
            <p>
              Aqui você poderá consultar qualquer usuário cadastrado na GitHub.
              Basta você inserir o nome de usuário no campo abaixo e clicar em
              pesquisar
            </p>
          </div>
        </div>
      </section>

      <section className={styles.sectionForm}>
        <div className={stylesReset.container}>
          <form className={styles.contentForm} onSubmit={handleSubmit}>
            <Input
              label="Nome de Usuário"
              id="user"
              type="text"
              onBlur={handleBlur}
              value={user}
              setValue={setUser}
            />
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.button}>Pesquisar</button>
          </form>
        </div>
      </section>

      {dataUser && <DataUser data={dataUser} />}
    </>
  );
};

export default Home;
