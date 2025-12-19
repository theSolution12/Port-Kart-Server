import dotenv from 'dotenv';
dotenv.config();

export const keepAwake = () => {
  const RENDER_URL = process.env.RENDER_EXTERNAL_URL || process.env.BACKEND_URL;
  
  if (!RENDER_URL) {
    console.info('No RENDER_EXTERNAL_URL or BACKEND_URL set, skipping keep-alive');
    return;
  }

  const ping = async () => {
    try {
      const response = await fetch(`${RENDER_URL}/health`);
      console.info(`Keep-alive ping: ${response.status}`);
    } catch (error) {
      console.error(`Keep-alive ping failed: ${error.message}`);
    }
    
    // Random sleep between 3-14 minutes
    const sleepTime = (Math.random() * 11 + 3) * 60 * 1000;
    setTimeout(ping, sleepTime);
  };

  // Start pinging after initial delay
  setTimeout(ping, 60 * 1000); // First ping after 1 minute
  console.info('Keep-alive service started');
};
