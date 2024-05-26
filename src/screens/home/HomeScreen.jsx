import React, {useEffect, useState} from 'react';
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
} from 'react-native-cool-speedometer';
import {Box, Text} from '@gluestack-ui/themed';
import {primaryColor} from '../../constant/colors';
import {Text as SvgText} from 'react-native-svg';
import GGAbly from '../../libraries/gasGuardAbly.js';
import {getStoreData} from '../../libraries/helpers.jsx';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = ({}) => {
  const [gasValue, setGasValue] = useState(0);
  const [preferences, setPreferences] = useState({
    danger_threshold: 650,
    enable_sms: false,
    history_interval: 1,
    id: 1,
    warning_threshold: 350,
  });

  useFocusEffect(
    React.useCallback(() => {
      getPreferences();
    }, []),
  );

  useEffect(() => {
    handleAblySubscribe();
  }, []);

  const getPreferences = async () => {
    let tempPref = await getStoreData('preferences_data');
    if (tempPref) {
      tempPref = JSON.parse(tempPref);
      setPreferences({...tempPref});
    }
  };

  const handleProgressColor = value => {
    let color = 'green';
    let status = 'Safe';
    if (value > parseInt(preferences.danger_threshold)) {
      color = 'red';
      status = 'Danger';
    } else if (
      value > parseInt(preferences.warning_threshold) &&
      value <= parseInt(preferences.danger_threshold)
    ) {
      color = 'orange';
      status = 'Warning';
    } else {
    }

    return {color, status};
  };

  const handleAblySubscribe = () => {
    let valTimer = null;
    const meterChannel = GGAbly.GG_CHANNELS.meter;
    GGAbly.getChannelSub(meterChannel).subscribe(message => {
      let val = 0;
      if (valTimer != null) {
        clearTimeout(valTimer);
        valTimer = null;
      }
      if (message?.data) {
        const data = JSON.parse(message.data);
        val = parseFloat(data.val);
        // console.log('Val: ', val);
        let temp = (parseFloat(val) / 100) * 10000;
        temp = parseFloat(temp.toFixed(2));
        setGasValue(temp);

        valTimer = setTimeout(() => {
          val = 0;
          setGasValue(val);
        }, 60000);
      }
    });
  };

  const meterWidth = 350;

  return (
    <Box h="100%" justifyContent="center">
      <Box alignItems="center" zIndex={-1}>
        <Speedometer
          value={gasValue}
          max={10000}
          angle={160}
          fontFamily="squada-one"
          accentColor={primaryColor}
          width={meterWidth}
          height={meterWidth * 0.83333}>
          <Background angle={180} />
          <Arc strokeWidth={10} arcWidth={10} />
          <Needle />
          {/* <DangerPath angle={56} offset={10} /> */}
          <Progress
            color={handleProgressColor(gasValue).color}
            strokeWidth={10}
            arcWidth={10}
          />
          <Marks step={1000} />
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
