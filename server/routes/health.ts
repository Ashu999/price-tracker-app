import express from 'express';
export const routes = express();
routes.get('/health', async (req, res, next) => {
  res.send('Server: All Good');
});
