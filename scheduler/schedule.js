const cron = require('node-cron');
const client = require('../lib/redisclient');

(async () => {
  await client.connect(); 

  const SendMessageInChannel = async () => {
    try {
      const message = {
        username: 'Abiskar',
        email: 'abiskar@gmail.com',
      };
      await client.publish('userdata', JSON.stringify(message));
      console.log('Published:', message);
    } catch (error) {
      console.error('Publishing error:', error);
    }
  };

  cron.schedule('* * * * * *', SendMessageInChannel);
})();
