import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Header, UserInfo, Repository } from './styles';
import api from '../../services/api';

const User = () => {
  const [repositories, setRepositories] = useState([]);
  const { params } = useRouteMatch();

  const storagedUser = localStorage.getItem('@GithubSearch:user');
  const user = JSON.parse(storagedUser);

  useEffect(() => {
    api.get(`users/${params.user_login}/repos`).then((res) => {
      setRepositories(res.data);
    });
  }, [params.user_login]);

  return (
    <>
      <Header>
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      <UserInfo>
        <header>
          <img
            src={user.avatar_url}
            alt="user.login"
          />
          <div>
            <strong>{user.name}</strong>
            <p />
          </div>
        </header>
        <ul>
          <li>
            <strong>Seguidores</strong>
            <span>{user.followers}</span>
          </li>
          <li>
            <strong>Seguindo</strong>
            <span>{user.following}</span>
          </li>
          <li>
            <strong>Repositórios</strong>
            <span>{user.public_repos}</span>
          </li>
        </ul>
      </UserInfo>

      {repositories ? (
        repositories.map((repo) => (
          <Repository key={repo.id}>
            <a href={repo.svn_url} target="blank">
              <div>
                <strong>
                  {repo.name}
                </strong>
                <p>
                  Descrição:
                  {' '}
                  {repo.description}
                </p>
                <p>
                  Stars:
                  {' '}
                  {repo.stargazers_count}
                </p>
              </div>
              <FiChevronRight size={20} />
            </a>
          </Repository>
        ))
      )
        : (
          <Repository>
            <h2>
              Usuário sem repositórios públicos!
            </h2>
          </Repository>
        )}
    </>
  );
};

export default User;
