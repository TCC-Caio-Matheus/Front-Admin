import styles from "./styles.module.scss";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Store } from "../../intefaces";

interface Props {
  stores?: Array<Store>;
}

export default function StoreChart({ stores }: Props) {
  const [labels, setLabels] = useState<Array<string>>([]);
  const [values, setValues] = useState<Array<any>>([]);

  var chartData: Array<any> = [];

  useEffect(() => {
    console.log(stores);
    stores?.forEach((store: Store) => {
      chartData.push(store.type);
    });

    var teste: Array<any> = [];
    chartData.forEach((x) => {
      if (teste.some((elemnt) => elemnt === x)) {
      } else {
        teste.push(x);
        setLabels(labels => [...labels, x])

        let temp = labels;
        labels.push(x);
        setLabels(temp);
        
      }
    });

    labels.forEach((x) => {
      const value = chartData.filter((v) => v === x).length;
      setValues(values => [...values, value])

    });
  }, []);



  const data = {
    labels: labels,
    datasets: [
      {
        label: "# teste",
        data: values,
        backgroundColor: ["rgba(137, 166, 126, 1)"],
        borderColor: ["rgba(137, 166, 126, 1)"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h2>Lojas por segmento</h2>
      <Bar data={data} options={{ plugins: { legend: { display: false } } }} />
    </div>
  );
}
