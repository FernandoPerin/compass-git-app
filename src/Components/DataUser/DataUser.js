import React from 'react';

// Importação CSS
import styles from './DataUser.module.css';
import stylesReset from '../../assets/css/Reset.module.css';

const DataUser = ({ data }) => {
  const [repositories, setRepositories] = React.useState([]);
  const [repositoryType, setRepositoryType] = React.useState('');
  const [repositoryEmpty, setRepositoryEmpty] = React.useState('');

  React.useEffect(() => {
    setRepositories([]);
    setRepositoryType('');
    setRepositoryEmpty('');
  }, [data]);

  async function handleClick({ target }) {
    setRepositoryEmpty('');
    let response;
    if (target.id == 'repos') {
      response = await (await fetch(data.repos_url)).json();
      setRepositoryType('repos');
    } else if (target.id == 'starred') {
      response = await (
        await fetch(data.starred_url.replace('{/owner}{/repo}', ''))
      ).json();
      setRepositoryType('starred');
    }
    if (response.length === 0) {
      setRepositoryEmpty('Nenhum repositório encontrado');
    }
    setRepositories(response);
  }

  if (data.message) {
    return (
      <>
        <h2 className={styles.userNotFound}>Usuário não encontrado</h2>
      </>
    );
  } else {
    return (
      <section className={`${styles.sectionData} ${stylesReset.transition}`}>
        <div className={stylesReset.container}>
          <div className={styles.cardUser}>
            <img
              src={data.avatar_url}
              alt="Avatar do usuário"
              title="Avatar do usuário"
            />

            <h2>{data.login}</h2>
            <h3>{data.id}</h3>

            <a
              className={styles.linkPerfil}
              href={data.html_url}
              target="_blank"
            >
              Acessar Perfil
            </a>

            <div className={styles.includesButtons}>
              <button id="repos" onClick={handleClick}>
                Ver Repositórios
              </button>
              <button id="starred" onClick={handleClick}>
                Ver Visitados
              </button>
            </div>
          </div>

          {repositoryEmpty && (
            <h3 className={styles.repositoryEmpty}>
              Nenhum repositório encontrado
            </h3>
          )}

          {repositories.length !== 0 && (
            <div className={styles.includesTable}>
              <table
                bgcolor="#ffffff"
                align="center"
                cellPadding="0"
                cellSpacing="0"
                border="0"
              >
                <thead>
                  <tr>
                    {repositoryType === 'repos' && (
                      <th>Repositórios do Usuário</th>
                    )}

                    {repositoryType === 'starred' && (
                      <th>Repositórios Visitados</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td className={styles.titleColumns}>ID</td>
                            <td className={styles.titleColumns}>Nome</td>
                          </tr>

                          {repositories.map((repository) => (
                            <tr key={repository.id}>
                              <td className={styles.contentColumn}>
                                {repository.id}
                              </td>

                              <td className={styles.contentColumn}>
                                {repository.name}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    );
  }
};

export default DataUser;
