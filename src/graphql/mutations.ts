import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
    }
  }
`;

export const UPDATE_QUIZ = gql`
  mutation UpdateQuiz($quiz: updateQuizInput) {
    updateQuiz(input: $quiz) {
      quiz {
        name
      }
    }
  }
`;

export const CREATE_QUIZ = gql`
  mutation CreateQuiz($quiz: createQuizInput) {
    createQuiz(input: $quiz) {
      quiz {
        id
      }
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation createQuestion($question: createQuestionInput) {
    createQuestion(input: $question) {
      question {
        id
      }
    }
  }
`;

export const CREATE_QUESTION_OPTION = gql`
  mutation CreateQuestionOption($questionOption: createQuestionOptionInput) {
    createQuestionOption(input: $questionOption) {
      questionOption {
        id
      }
    }
  }
`;

export const CREATE_SUGGESTION = gql`
  mutation createSuggestion($suggestion: createSuggestionInput) {
    createSuggestion(input: $suggestion) {
      suggestion {
        id
      }
    }
  }
`;

export const DELETE_QUESTION = gql`
mutation deleteQuestion($deleteQuestion:deleteQuestionInput) {
  deleteQuestion(input: $deleteQuestion) {
    question {
      id
    }
  }
}

`;
