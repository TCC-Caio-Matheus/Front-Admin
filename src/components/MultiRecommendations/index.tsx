import { useState } from "react";
import Input from "../Input";
import RoundButton from "../RoundButton";
import styles from "./styles.module.scss";
import { Suggestion } from "../../intefaces";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

interface Props {
  getValues: (values: Suggestion[]) => void;
}

export default function MultiRecommendations({ getValues }: Props) {
  const [recommendations, setRecommendations] = useState<Suggestion[]>([
    { description: "", range_min: 0, range_max: 0 },
  ]);
  const handleInput = (value: string, index: number) => {
    let temp = recommendations;
    temp[index].description = value;
    setRecommendations(temp);
  };

  const updateRangeInput = (values: Array<number>, index: number) => {
    let temp = recommendations;
    temp[index].range_max = values[0];
    temp[index].range_min = values[1];
    setRecommendations(temp);
    getValues(recommendations);
  };
  const addRecomendation = () => {
    if (recommendations.length == 4) {
      alert("Máximo de 4 perguntas");
    } else {
      setRecommendations([
        ...recommendations,
        { description: "", range_min: 0, range_max: 0 },
      ]);
    }
  };

  return (
    <div className={styles.container}>
      {recommendations.map((recommendation, index) => {
        return (
          <div className={styles.anwsersView} key={index}>
            <Input
              text={"Recomendação " + (index + 1).toString()}
              type="multiline"
              onChange={(value: string) => handleInput(value, index)}
            />
            <div className={styles.sliderView}>
              <span>Nota para dica </span>
              <Range
                onChange={(values) => updateRangeInput(values, index)}
                allowCross={false}
                marks={{ 0: 0, 50: 50, 100: 100 }}
                trackStyle={[
                  {
                    backgroundColor: "#89A67E",
                    height: 10,
                  },
                ]}
                handleStyle={[
                  {
                    backgroundColor: "#89A67E",
                    height: 20,
                    width: 20,
                    borderColor: "#000",
                    boxShadow: "none",
                  },
                  {
                    backgroundColor: "#89A67E",
                    height: 20,
                    width: 20,
                    borderColor: "#000",
                    boxShadow: "none",
                  },
                ]}
                railStyle={{
                  height: 10,
                  color: "#fff",
                }}
                tipFormatter={(value) => value}
              />
            </div>
          </div>
        );
      })}
      <RoundButton onClick={addRecomendation} />
    </div>
  );
}
