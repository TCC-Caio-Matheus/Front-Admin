/* eslint-disable @next/next/link-passhref */
import type { NextPage } from "next";
import React, { useContext } from "react";
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
import { Quiz, Store } from "../intefaces";
import { AuthContext } from "../contexts/AuthContext";
import StoreChart from "../components/StoreChart";

const Home: NextPage = () => {
  const client = useApolloClient();
  const authContext = useContext(AuthContext);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalAnwsers, setTotalAnwsers] = useState<number>(0);
  const [stores, setStores] = useState<Array<Store> | undefined>(undefined);
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
      setTotalAnwsers(response.data.answers.length);
    } catch (error) {}
  };

  const getTotalStores = async () => {
    try {
      const response = await client.query({
        query: GET_STORES,
      });
      setStores(response.data.stores);
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
    (async function () {
      const response = await authContext.checkToken();
      if (response) {
      await getTotalUsers();
      await getTotalAnwsers();
      await getTotalStores();
      await getQuizzes();

      } else {
      router.push("/");
      }
    })();
  }, []);

  return (
    <>
      <Header title="Home" />
      <div className={styles.container}>
        <section>
          <div className={styles.metrics}>
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
                value={stores?.length.toString()}
              />
            </div>
            {stores != undefined ? <StoreChart stores={stores} /> : ""}
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
            <div className={styles.quizzesView}>
              {quizzes?.map((quiz) => {
                return (
                  <React.Fragment key={quiz.id}>
                    <Link href={`quiz/${quiz.id}`} passHref>
                      <QuizButton onClick={() => {}} title={quiz.name} />
                    </Link>
                    <div className={styles.spacer}> </div>
                  </React.Fragment>
                );
              })}
              {quizzes === null || quizzes.length === 0 ? (
                <>
                  <div className={styles.noData}>
                    <span>Nenhum quiz cadastrado</span>
                    <img alt="Empty box" src="/images/empty.svg" />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
