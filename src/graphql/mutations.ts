import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
    }
  }
`;

export const UPDATE_QUIZ = gql`
mutation UpdateQuiz($quiz:updateQuizInput) {
  updateQuiz(input: $quiz) {
    quiz {
      name
    }
  }
}
`;


