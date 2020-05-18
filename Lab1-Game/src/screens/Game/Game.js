import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { RobotPicture } from "../../components/RobotPicture/RobotPicture";
import { GameButton } from "../../components/GameButton/GameButton";
import { Cube } from "../../components/Cube/Cube";
import { StyleSheet, View, Text } from "react-native";

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export const Game = ({ navigation }) => {
  const winCount = 50;
  const [statusText, setStatusText] = useState("Ваш черёд бросать кубики");
  const [winner, setWinner] = useState(null);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [botIsPlaying, setBotIsPlaying] = useState(false);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [botPoints, setBotPoints] = useState(0);
  const [cubeDots, setCubeDots] = useState([5, 6]);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setStatusText("Ваш черёд бросать кубики");
        setWinner(null);
        setDisabledBtn(false);
        setBotIsPlaying(false);
        setPlayerPoints(0);
        setBotPoints(0);
        setCubeDots([5, 6]);
        setIsLoading(false);
      };
    }, [])
  );

  useEffect(() => {
    if (botIsPlaying) playBot();
  }, [botIsPlaying]);

  const onSubmit = async () => {
    setDisabledBtn(true);
    setStatusText("Вы бросили кубики...");
    setIsLoading(true);
    setTimeout(() => {
      let a = randomInteger(1, 6);
      let b = randomInteger(1, 6);
      setCubeDots([a, b]);
      setIsLoading(false);
      setPlayerPoints((prev) => prev + a + b);
      setStatusText(
        "+ " +
          (a + b) +
          (a + b < 5 ? " очка!" : " очков!") +
          (a === b ? "\nВыпал дубль, бросайте ещё!" : "")
      );
      if (a === b) setDisabledBtn(false);
      else {
        setBotIsPlaying(true);
      }
    }, 1800);
  };

  const playBot = (prevPoints = null) => {
    setTimeout(() => {
      setStatusText("Бот бросает кубики...");
      setIsLoading(true);
      setTimeout(() => {
        let a = randomInteger(1, 6);
        let b = randomInteger(1, 6);
        let botNewPoints =
          (prevPoints === null ? botPoints : prevPoints) + a + b;
        setCubeDots([a, b]);
        setIsLoading(false);
        setBotPoints((prev) => prev + a + b);
        setStatusText(
          "+ " +
            (a + b) +
            (a + b < 5 ? " очка" : " очков") +
            " Боту! " +
            (a === b && winner === null
              ? "\nВыпал дубль, Бот бросает ещё!"
              : "")
        );
        if (a !== b) {
          if (botNewPoints < winCount && playerPoints < winCount) {
            setTimeout(() => {
              setDisabledBtn(false);
              setStatusText("Ваш черёд бросать кубики");
            }, 1200);
          } else {
            console.log(botNewPoints + " " + playerPoints);
            setDisabledBtn(true);
            setTimeout(() => {
              navigation.navigate("Result", {
                winner:
                  botNewPoints === playerPoints
                    ? "both"
                    : botNewPoints > playerPoints
                    ? "bot"
                    : "player",
              });
            }, 1200);
          }
          setBotIsPlaying(false);
        } else {
          playBot(botNewPoints);
        }
      }, 1500);
    }, 1800);
  };

  return (
    <>
      <View style={styles.content}>
        <RobotPicture />
        <View style={styles.cubeContainer}>
          <Cube dotsCount={cubeDots[0]} isLoading={isLoading} />
          <Cube dotsCount={cubeDots[1]} isLoading={isLoading} />
        </View>
        <View style={styles.textStatusContainer}>
          <Text style={styles.textStatus}>{statusText}</Text>
        </View>
        <View style={styles.pointsContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Очки</Text>
          </View>
          <View style={styles.points}>
            <View style={[styles.player, { borderRightWidth: 2 }]}>
              <Text style={styles.headerText}>Игрок</Text>
              <Text style={styles.pointCount}>{playerPoints}</Text>
            </View>
            <View style={styles.player}>
              <Text style={styles.headerText}>Бот</Text>
              <Text style={styles.pointCount}>{botPoints}</Text>
            </View>
          </View>
        </View>
      </View>

      <GameButton
        title="Бросить кубики"
        onSubmit={onSubmit}
        disabled={disabledBtn}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  cubeContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textStatusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
    marginHorizontal: "5%",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  textStatus: {
    textAlign: "center",
    fontSize: 20,
  },
  pointsContainer: {
    width: "100%",
    borderWidth: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 2,
    paddingVertical: 4,
  },
  headerText: {
    fontSize: 20,
  },
  points: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  player: {
    paddingVertical: 4,
    width: "50%",
    alignItems: "center",
  },
  pointCount: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
