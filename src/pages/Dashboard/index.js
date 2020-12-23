import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Title, Form, Users, Error,
} from './styles';
import api from '../../services/api';

const Dashboard = () => {
  const [userObject, setUserObject] = useState(() => {
    const storagedUser = localStorage.getItem('@GithubSearch:user');

    if (storagedUser) {
      return JSON.parse(storagedUser);
    }
    return {};
  });
  const [inputError, setInputError] = useState('');
  const [userValue, setUserValue] = useState('');

  useEffect(() => {
    localStorage.setItem('@GithubSearch:user', JSON.stringify(userObject));
  }, [userObject]);

  const handleAddUser = async (event) => {
    event.preventDefault();
    if (!userValue) {
      setInputError('Digite o nome do usuário!');
      setUserObject({});
      return;
    }

    try {
      const response = await api.get(`users/${userValue}`);

      const userRepository = response.data;
      setUserObject(userRepository);
      setUserValue('');
      setInputError('');
    } catch (err) {
      setUserObject({});
      setInputError('Erro na busca desse usuário!');
    }
  };

  return (
    <>
      <Title>Busque usuários no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddUser}>
        <input
          value={userValue}
          onChange={(e) => setUserValue(e.target.value)}
          placeholder="Digite o nome do usuário"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}

      {JSON.stringify(userObject) !== '{}'
        && (
        <Users>

          <Link to={`/user/${userObject.login}`}>
            <img
              src={userObject.avatar_url}
              alt={userObject.login}
            />
            <div>
              <strong>
                {userObject.name}
              </strong>
              <p>
                Repositórios:
                {' '}
                {userObject.public_repos}
              </p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        </Users>
        )}
    </>
  );
};

export default Dashboard;
