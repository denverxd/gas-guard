import {View, Text, Button} from 'react-native';
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
import {Box} from '@gluestack-ui/themed';
import {primaryColor} from '../../constant/colors';
import {Text as SvgText} from 'react-native-svg';

const HomeScreen = () => {
  const {setIsSignedIn} = useContext(MainNavigatorContext);

  const [gasValue, setGasValue] = useState(0);

  useEffect(() => {
    let val = 0;
    const testGauge = setInterval(() => {
      val = (val + 10.7).toFixed(2);
      val = parseFloat(val);
      if (val < 100) {
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
    if (value >= 70) {
      color = 'red';
    } else if (value > 50 && value < 70) {
      color = 'orange';
    }

    return color;
  };

  return (
    <View>
      <Box alignItems="center" mt={20} zIndex={-1}>
        <Speedometer
          value={gasValue}
          max={100}
          angle={160}
          fontFamily="squada-one"
          accentColor={primaryColor}
          width={300}
          height={250}>
          <Background angle={180} />
          <Arc strokeWidth={10} arcWidth={10} />
          <Needle />
          <DangerPath angle={48} offset={10} />
          <Progress
            color={handleProgressColor(gasValue)}
            strokeWidth={10}
            arcWidth={10}
          />
          <Marks />
          <Indicator>
            {(value, textProps) => (
              <SvgText
                {...textProps}
                fontSize={40}
                fill={handleProgressColor(gasValue)}
                x={300 / 2}
                y={300 / 2 + 50}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontFamily="squada-one">
                {`${gasValue} ppm`}
              </SvgText>
            )}
          </Indicator>
        </Speedometer>
      </Box>
      <Button title="Sign Out" onPress={() => setIsSignedIn(false)} />
    </View>
  );
};

export default HomeScreen;
