import { gql } from "@apollo/client";

export const GET_QUIZZES = gql`
  query GetQuizzes {
    quizzes {
      id
      name
      score
      questions {
        id
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
    }
  }
`;

export const GET_ANWSERS = gql`
  query GetAnwsers {
    answers {
      id
    }
  }
`;

export const GET_STORES = gql`
  query GetStores {
    stores {
      id
    }
  }
`;

export const GET_QUIZ = gql`
  query getQuiz($id: ID!) {
    quiz(id: $id) {
      id
      name
      score
      questions {
        id
        title
        type
      }
    }
  }
`;
