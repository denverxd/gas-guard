import React, {useContext, useEffect, useState} from 'react';
import {MainNavigatorContext} from '../../navigation/MainNavigator';
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
  DangerPath,
} from 'react-native-cool-speedometer';
import {Box, Text} from '@gluestack-ui/themed';
import {primaryColor} from '../../constant/colors';
import {Text as SvgText} from 'react-native-svg';

const HomeScreen = () => {
  const [gasValue, setGasValue] = useState(0);

  useEffect(() => {
    let val = 0;
    const testGauge = setInterval(() => {
      val = (val + 107.3).toFixed(2);
      val = parseFloat(val);
      if (val < 1000) {
        setGasValue(val);
      } else {
        val = 0;
        setGasValue(0);
      }
    }, 1000);

    return () => clearInterval(testGauge);
  }, []);

  const handleProgressColor = value => {
    let color = 'green';
    let status = 'Safe';
    if (value > 650) {
      color = 'red';
      status = 'Danger';
    } else if (value > 350 && value <= 650) {
      color = 'orange';
      status = 'Warning';
    } else {
    }

    return {color, status};
  };

  const meterWidth = 350;

  return (
    <Box h="100%" justifyContent="center">
      <Box alignItems="center" zIndex={-1}>
        <Speedometer
          value={gasValue}
          max={1000}
          angle={160}
          fontFamily="squada-one"
          accentColor={primaryColor}
          width={meterWidth}
          height={meterWidth * 0.83333}>
          <Background angle={180} />
          <Arc strokeWidth={10} arcWidth={10} />
          <Needle />
          <DangerPath angle={56} offset={10} />
          <Progress
            color={handleProgressColor(gasValue).color}
            strokeWidth={10}
            arcWidth={10}
          />
          <Marks step={100} />
          <Indicator>
            {(value, textProps) => (
              <SvgText
                {...textProps}
                fontSize={40}
                fill={handleProgressColor(gasValue).color}
                x={meterWidth / 2}
                y={meterWidth / 2 + meterWidth * 0.16666}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontFamily="squada-one">
                {`${gasValue} ppm`}
              </SvgText>
            )}
          </Indicator>
        </Speedometer>
      </Box>
      <Box
        w={200}
        alignItems="center"
        alignSelf="center"
        borderRadius={999}
        py={5}
        bg={handleProgressColor(gasValue).color}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: 'white',
          }}>
          {handleProgressColor(gasValue).status}
        </Text>
      </Box>
    </Box>
  );
};

export default HomeScreen;
