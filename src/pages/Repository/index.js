import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList } from './styles';

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
    issuesAll: [],
    issuesOpen: [],
    loading: true,
    all: false,
    open: false,
    closed: false,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues, issuesOpen] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'all',
          per_page: 10,
        },
      }),

      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 10,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issuesAll: issues.data,
      issuesOpen: issuesOpen.data,
      loading: false,
    });
  }

  componentDidUpdate() {
    const { all } = this.state;
    handleSelectChange = (e) => {
      console.log(e.target.value);
    };
  }

  render() {
    const {
      repository,
      issuesAll,
      issuesOpen,
      loading,
      all,
      open,
      closed,
    } = this.state;

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
        <select id="cars" name="carlist" form="carform">
          <option onChange={this.handleSelectChange} value={all}>
            All
          </option>
          <option onChange={this.handleSelectChange} value={open}>
            Open
          </option>
          <option onChange={this.handleSelectChange} value={closed}>
            Closed
          </option>
        </select>
        <IssueList>
          {issuesOpen.map((issue) => (
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
      </Container>
    );
  }
}
