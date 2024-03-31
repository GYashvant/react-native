import {View, StyleSheet} from 'react-native';
import {Colors} from '../styles/Colors';
import {Coordinate} from '../types/Type';

interface SnakeProps {
  snake: Coordinate[];
}

const Snake = ({snake}: SnakeProps): JSX.Element => {
  return (
    <>
      {snake.map((segment: Coordinate, index: number) => {
        const segmentStyle = {
          left: segment.x * 10, // adjust for the size of each segment
          top: segment.y * 10,
        };
        return <View key={index} style={[styles.snake, segmentStyle]}></View>;
      })}
    </>
  );
};

const styles = StyleSheet.create({
  snake: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    position: 'absolute',
  },
});

export default Snake;
