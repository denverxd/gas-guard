import {View, Text} from 'react-native';
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
import {Box, Button} from '@gluestack-ui/themed';
import {primaryColor} from '../../constant/colors';
import {Text as SvgText} from 'react-native-svg';
import {ButtonText} from '@gluestack-ui/themed';

const HomeScreen = () => {
  const {setIsSignedIn} = useContext(MainNavigatorContext);

  const [gasValue, setGasValue] = useState(0);
  const [gasStatus, setGasStatus] = useState('');

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

  return (
    <View>
      <Box alignItems="center" mt={20} zIndex={-1}>
        <Speedometer
          value={gasValue}
          max={1000}
          angle={160}
          fontFamily="squada-one"
          accentColor={primaryColor}
          width={300}
          height={250}>
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
      <Box
        w={200}
        alignItems="center"
        alignSelf="center"
        borderRadius={999}
        py={5}
        bg={handleProgressColor(gasValue).color}
        mt={-20}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: 'white',
          }}>
          {handleProgressColor(gasValue).status}
        </Text>
      </Box>
      <Button
        title="Sign Out"
        onPress={() => setIsSignedIn(false)}
        style={{marginTop: 100}}>
        <ButtonText>Sign Out</ButtonText>
      </Button>
    </View>
  );
};

export default HomeScreen;
