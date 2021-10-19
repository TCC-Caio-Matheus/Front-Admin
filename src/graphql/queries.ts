import { gql } from '@apollo/client';

export const GET_QUIZZES = gql`
  query GetQuizzes {
    quizzes {
      name,
      id,
      score,
    }
  }
`;

