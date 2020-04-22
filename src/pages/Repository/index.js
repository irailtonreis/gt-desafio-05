import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, Pagination } from './styles';

export default class Repository extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    loading: true,
    issues: [],
    filter: 'all',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);
    const { page } = this.state;
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues?page=4`, {
        params: {
          state: 'all',
          per_page: 5,
          page,
        },
      }),
    ]);
    console.log(issues);
    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  async componentDidUpdate(_, prevState) {
    const { match } = this.props;

    const { filter } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    if (prevState.filter !== filter) {
      const [repository, issues] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: `${filter}`,
            per_page: 10,
          },
        }),
      ]);

      this.setState({
        repository: repository.data,
        issues: issues.data,
        loading: false,
      });
    }
  }

  handleSelectChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  handlePagination = async (action) => {
    const { page } = this.state;
    this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });
  };

  render() {
    const { repository, loading, issues, page } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img
            src={repository.owner.avatar_url}
            alt={repository.owner.avatar_url}
          />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <select
          id="cars"
          name="carlist"
          form="carform"
          onChange={this.handleSelectChange}
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        <IssueList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <Pagination>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.handlePagination('back')}
          >
            Anterior
          </button>
          <span>Página {page} </span>
          <button type="button" onClick={() => this.handlePagination('next')}>
            Próximo
          </button>
        </Pagination>
      </Container>
    );
  }
}
