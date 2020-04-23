import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0 10px;

  button {
    padding: 10px;
    color: #fff;
    background: #7159c1;
    border: none;
    border-radius: 4px;
    text-transform: uppercase;
    transition: background 0.2s;

    &:hover {
      opacity: 0.7;
    }

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }
`;

export const Filter = styled.select`
  display: flex;
  width: 250px;
  background: #7159c1;
  height: 48px;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }
  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }
  h1 {
    font-size: 24px;
    margin-top: 20px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #757575;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid rgb(78, 78, 78, 0.9);
    border-radius: 4px;
    box-shadow: 2px 2px 2px 1px rgb(113, 89, 193, 0.9);

    & + li {
      margin-top: 10px;
    }
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }
    div {
      flex: 1;
      margin-left: 15px;
      strong {
        font-size: 16px;
        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }
        span {
          background: #d73c4a;
          color: #fff;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }
      p {
        margin-top: 15px;
        font-size: 12px;
        color: #3d3d3d;
      }
    }
  }
`;
