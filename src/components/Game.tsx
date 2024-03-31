import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  FOOD_INITIAL_POSITION,
  GAME_BOUNDS,
  MOVE_INTERVAL,
  SCORE_INCREMENT,
  SNAKE_INITIAL_POSITION,
} from '../../constant';
import {Colors} from '../styles/Colors';
import {Coordinate, Direction} from '../types/Type';
import {checkEatsFood} from '../utils/CheckEatsFood';
import {checkGameOver} from '../utils/CheckGameOver';
import {randomFoodPosition} from '../utils/RandomFoodPosition';
import Food from './Food';
import Header from './Header';
import Score from './Score';
import Snake from './Snake';

const Game = (): JSX.Element => {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gamePaused, setGamePaused] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (!gameOver) {
      const intervalId = setInterval(() => {
        !gamePaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [snake, gameOver, gamePaused]);

  const handleGesture = (event: any) => {
    const {translationX, translationY} = event.nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        //moving Right
        setDirection(Direction.Right);
      } else {
        //moving left
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        //moving down
        setDirection(Direction.Down);
      } else {
        //moving up
        setDirection(Direction.Up);
      }
    }
  };

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = {...snakeHead}; // create a new copy

    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setGameOver(prev => !prev);
      return;
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }
    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore(score + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setGameOver(false);
    setScore(0);
    setDirection(Direction.Right);
    setGamePaused(false);
  };

  const pauseGame = () => {
    setGamePaused(!gamePaused);
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header
          reloadGame={reloadGame}
          pauseGame={pauseGame}
          isPaused={gamePaused}>
          <Score score={score} />
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boundaries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.background,
  },
});

export default Game;
