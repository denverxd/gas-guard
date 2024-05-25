import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import GGAbly from '../gasGuardAbly';
import {newNotification} from './notificationActions';

//set CHANNEL_SCOPE  channel
const CHANNEL_SCOPE = 'test-notif';

const ably = GGAbly.client;

export const useAblyChannel = (channel = 'test-notif', dependencies) => {
  const dispatch = useDispatch();

  const [onMessage, setOnMessage] = useState('Please wait..');
  const [isLoading, setLoading] = useState(true);
  const [channelData, setChannelData] = useState(null);

  useEffect(() => {
    ably.connection.on(function (stateChange) {
      setOnMessage(stateChange.current);
      setLoading(true);
    });

    const useChannel = ably.channels.get(`${CHANNEL_SCOPE}`);
    useChannel.subscribe(channel, message => {
      console.log({message});
      if (message.data.length > 0) {
        dispatch(newNotification(message.data));
        setOnMessage('Loading Data...');
        setLoading(false);
        setChannelData(message.data);
      }
    });
  }, dependencies);

  return [isLoading, onMessage, channelData];
};
