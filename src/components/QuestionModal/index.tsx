import { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import QuestionType from "../QuestionType";
import styles from "./styles.module.scss";
import YesNoAnswer from "../YesNoAnwser";
import MultiAnwser from "../MultiAnwser";
import { Question, QuestionOption, Suggestion } from "../../intefaces";
import MultiRecommendations from "../MultiRecommendations";
import { useApolloClient } from "@apollo/client";
import { GET_QUESTION } from "../../graphql/queries";
import Loading from "../Loading";
import {
  CREATE_QUESTION,
  CREATE_QUESTION_OPTION,
  CREATE_SUGGESTION,
} from "../../graphql/mutations";

interface Props {
  closeModal: (close: boolean) => void;
  createQuestion: (question: Question) => void;
  editQuestion?: string;
}

interface AnwserModal {
  yes: number;
  no: number;
  yesNo: number;
}

export default function QuestionModal({
  closeModal,
  createQuestion,
  editQuestion,
}: Props) {
  const client = useApolloClient();
  const [question, setQuestion] = useState<Question | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Array<Suggestion> | undefined>(
    undefined
  );
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    if (editQuestion) {
      (async function () {
        try {
          const response = await client.query({
            query: GET_QUESTION,
            variables: {
              id: editQuestion,
            },
          });
          setQuestion(response.data.question);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  const handleResponse = (answer: AnwserModal) => {};

  const nextPage = () => {
    setPage(1);
  };

  const handleSelect = (type: string) => {
    setQuestion({ ...question, type } as Question);
  };

  const handleSuggestions = (teste: Array<Suggestion>) => {
    setSuggestions(teste);
    setQuestion({
      ...question,
      suggestions: teste,
    } as Question);
  };

  const createQuestionOptionInputObj = (questionOption: QuestionOption) => {
    return {
      data: {
        description: questionOption.description,
        score: questionOption.score,
        question: question?.id,
      },
    };
  };

  const createQuestionInputObj = (question: Question) => {
    return {
      data: {
        title: question.title,
        type: question.type,
      },
    };
  };

  const createSuggestionInputObj = (suggestion: Suggestion) => {
    return {
      data: {
        description: suggestion.description,
        range_min: suggestion.range_min,
        range_max: suggestion.range_max,
        question: question?.id,
      },
    };
  };

  const defineQuestionId = async (id: string) => {
    let temp = question;
    if (temp) {
      temp.id = id;
      setQuestion(temp);
    }
  };

  const createQuestionsOptions = async (question: Question) => {
    let index = 0;
    if (question.question_options) {
      for await (let questionOption of question.question_options) {
        const createQuestionOptionInput =
          createQuestionOptionInputObj(questionOption);

        try {
          const response = await client.mutate({
            mutation: CREATE_QUESTION_OPTION,
            variables: {
              questionOption: createQuestionOptionInput,
            },
          });
          let temp = question.question_options;
          temp[index].id = response.data.createQuestionOption.questionOption.id;
          setQuestion({ ...question, question_options: temp } as Question);
          index++;
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const createSuggestions = async (question: Question) => {
    let index = 0;
    if (question.suggestions) {
      for await (let suggestion of question.suggestions) {
        const createSuggestionInput = createSuggestionInputObj(suggestion);

        try {
          const response = await client.mutate({
            mutation: CREATE_SUGGESTION,
            variables: {
              suggestion: createSuggestionInput,
            },
          });
          let temp = question.suggestions;
          temp[index].id = response.data.createSuggestion.suggestion.id;
          setQuestion({ ...question, suggestions: temp } as Question);
          index++;
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleCreateQuestion = async () => {
    setLoading(true);
    let temp = question;
    if (temp != undefined) {
      temp.suggestions = suggestions;
      setQuestion(temp);
    }
    if (question != undefined) {
      const createQuestionInput = createQuestionInputObj(question);

      try {
        const response = await client.mutate({
          mutation: CREATE_QUESTION,
          variables: {
            question: createQuestionInput,
          },
        });

        await defineQuestionId(response.data.createQuestion.question.id);
        await createQuestionsOptions(question);
        await createSuggestions(question);
        setLoading(false);
        createQuestion(question);
        closeModal(false)
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };


  const awnserBasedOnType = () => {
    switch (question?.type) {
      case "MULTIPLE_CHOICE":
        return (
          <>
            <MultiAnwser
              getValues={(values) => {
                setQuestion({ ...question, question_options: values });
              }}
            />
          </>
        );
        break;
      case "SINGLE_CHOICE":
        return (
          <>
            <h2>Nota das respostas</h2>
            <YesNoAnswer handleResponse={handleResponse} />
          </>
        );
        break;
      case "slider":
        return;
        break;
      default:
        return <h2>Selecione o tipo de pergunta</h2>;
    }
  };

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      {page == 0 ? (
        <div className={styles.content}>
          <div className={styles.insideContent}>
            <Input
              value={question?.title}
              text="Titulo da pergunta"
              onChange={(value) =>
                setQuestion({ ...question, title: value } as Question)
              }
            />
            <Input
              value={question?.score}
              text="Nota pergunta"
              type="number"
              onChange={(value) =>
                setQuestion({ ...question, score: parseInt(value) } as Question)
              }
            />
            <QuestionType value={question?.type} onChange={handleSelect} />
            {awnserBasedOnType()}

            <div className={styles.buttonView}>
              <Button text="Criar Recomendações" onClick={nextPage} />
              <Button
                text="Cancelar"
                outline={true}
                onClick={() => closeModal(false)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.insideContent}>
            <MultiRecommendations
              getValues={(values) => handleSuggestions(values)}
            />

            <div className={styles.buttonView}>
              <Button text="Criar pergunta" onClick={handleCreateQuestion} />
              <Button
                text="Cancelar"
                outline={true}
                onClick={() => closeModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
