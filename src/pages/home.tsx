import type { NextPage } from "next";
import Header from "../components/Header";
import styles from "../styles/home.module.scss";
import MetricCard from "../components/MetricCard";
import RoundButton from "../components/RoundButton";
import QuizButton from "../components/QuizButton";

const Home: NextPage = () => {
  const handleclick = () => {};
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
              <MetricCard title="Usuários" value="120" />
              <MetricCard title="alo" value="120" />
              <MetricCard title="alo" value="120" />
            </div>
          </div>
        </section>

        <section>
          <div className={styles.content}>
            <div className={styles.titleHeader}>
              <h1>Questionários</h1>
              <div className={styles.buttonView}>
                <RoundButton onClick={handleclick} />
              </div>
            </div>
            <QuizButton onClick={handleclick} title="Produto" />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
