import * as Ably from 'ably';

const ABLY_API_KEY =
  'aT-5UA.__xHfQ:dK3U1ljM3aDZptW6OUz69DIhyjlj4ZmgIT9aUBbbmcE';
const ABLY_CLIENT_ID = 'gasguard';

const client = new Ably.Realtime({
  key: ABLY_API_KEY,
  clientId: ABLY_CLIENT_ID,
});

const channel = client.channels.get('gasguardmainchannel');

export default {
  ABLY_API_KEY,
  ABLY_CLIENT_ID,
  client,
  channel,
};
