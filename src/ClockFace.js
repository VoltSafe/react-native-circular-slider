import React, { PureComponent } from 'react';
import { G, Circle, Text, Line } from 'react-native-svg';
import range from 'lodash.range';
import PropTypes from 'prop-types'; // ES6


export default class ClockFace extends PureComponent {

  static propTypes = {
    r: PropTypes.number,
    stroke: PropTypes.string,
  }

  getTimeText = (h) => {
    if(h == 0){
      return ("Midnight")
    }
    if(h == 6){
      return `6 am`
    }
    if(h == 18){
      return `6 pm`
    }    
    if(h == 12){
      return("Noon")
    }
  }

  render() {
    const { r, stroke } = this.props;
    const faceRadius = r - 2;
    const textRadius = r - 20;

    return (
      <G>
        {
          range(48).map(i => {
            const cos = Math.cos(2 * Math.PI / 48 * i);
            const sin = Math.sin(2 * Math.PI / 48 * i);

            return (
              <Line
                key={i}
                stroke={stroke}
                strokeWidth={i % 2 === 0 ? 1 : 1}
                x1={cos * faceRadius}
                y1={sin * faceRadius}
                x2={cos * (faceRadius - 7)}
                y2={sin * (faceRadius - 7)}
              />
            );
          })
        }
      <G transform={{translate: "0, 5.5"}}>
          {
            range(24).map((h, i) => (
              <Text
                key={i}
                fill={stroke}
                fontSize="11"
                textAnchor="middle"
                x={textRadius * Math.cos(Math.PI / 12 * i - Math.PI / 1.33  + Math.PI / 4)}
                y={textRadius * Math.sin(Math.PI / 12 * i - Math.PI / 1.33 + Math.PI / 4)}
              >
                {this.getTimeText(h)}
              </Text>
            ))
          }
        </G>      
      </G>
    );
  }
}
