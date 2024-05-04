import * as Ably from 'ably';

const client = new Ably.Realtime({
  key: 'aT-5UA.__xHfQ:dK3U1ljM3aDZptW6OUz69DIhyjlj4ZmgIT9aUBbbmcE',
  clientId: 'gasguard',
});

const channel = client.channels.get('gasguardmainchannel');

export default {
  client,
  channel,
};
