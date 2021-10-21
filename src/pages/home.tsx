import type { NextPage } from "next";
import Header from "../components/Header";
import styles from "../styles/home.module.scss";
import MetricCard from "../components/MetricCard";
import RoundButton from "../components/RoundButton";
import QuizButton from "../components/QuizButton";
import { IoPeople, IoStorefront, IoCheckbox } from "react-icons/io5";
import { BsListCheck } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import {
  GET_ANWSERS,
  GET_USERS,
  GET_STORES,
  GET_QUIZZES,
} from "../graphql/queries";
import { Quiz } from "../intefaces";

const Home: NextPage = () => {
  const client = useApolloClient();
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalAnwsers, setTotalAnwsers] = useState<number>(0);
  const [totalStores, setTotalStores] = useState<number>(0);
  const [quizzes, setQuizzes] = useState<Array<Quiz> | null>(null);
  const router = useRouter();

  const getTotalUsers = async () => {
    try {
      const response = await client.query({
        query: GET_USERS,
      });
      setTotalUsers(response.data.users.length);
    } catch (error) {}
  };

  const getTotalAnwsers = async () => {
    try {
      const response = await client.query({
        query: GET_ANWSERS,
      });
      setTotalAnwsers(response.data.anwsers.length);
    } catch (error) {}
  };

  const getTotalStores = async () => {
    try {
      const response = await client.query({
        query: GET_STORES,
      });
      setTotalStores(response.data.stores.length);
    } catch (error) {}
  };

  const getQuizzes = async () => {
    try {
      const response = await client.query({
        query: GET_QUIZZES,
      });
      setQuizzes(response.data.quizzes);
    } catch (error) {}
  };

  useEffect(() => {
    getTotalUsers();
    getTotalAnwsers();
    getTotalStores();
    getQuizzes();
  }, []);

  return (
    <>
      <Header title="E-diagnostico" />
      <div className={styles.container}>
        <section>
          <div className={styles.content}>
            <div className={styles.titleHeader}>
              <h1>Métricas</h1>
            </div>
            <div className={styles.metricView}>
              <MetricCard
                icon={<IoPeople className={styles.titleIcon} />}
                title="Usuários"
                value={totalUsers.toString()}
              />
              <MetricCard
                icon={<BsListCheck className={styles.titleIcon} />}
                title="Respostas"
                value={totalAnwsers.toString()}
              />
              <MetricCard
                icon={<IoStorefront className={styles.titleIcon} />}
                title="Lojas"
                value={totalStores.toString()}
              />
            </div>
          </div>
        </section>

        <section>
          <div className={styles.content}>
            <div className={styles.titleHeader}>
              <h1>Questionários</h1>
              <div className={styles.buttonView}>
                <RoundButton
                  onClick={() => {
                    router.push("/quiz/create");
                  }}
                />
              </div>
            </div>
            {quizzes?.map((quiz) => {
              return (
                <>
                  <Link key={quiz.id} href={`quiz/${quiz.id}`}>
                    <QuizButton onClick={() => {}} title={quiz.name} />
                  </Link>
                  <div className={styles.spacer}> </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
