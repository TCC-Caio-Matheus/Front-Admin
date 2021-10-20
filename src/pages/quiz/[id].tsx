import type { NextPage } from "next";
import { useRouter } from "next/router";
import QuizPage from "../../components/QuizPage";

const Id: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <QuizPage isEditing={true} id={id?.toString()} />
    </>
  );
};

export default Id;
