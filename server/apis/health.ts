import express from 'express';
export const apiRoute = express();
apiRoute.get('/health', async (req, res, next) => {
  res.send('Server: All Good');
});
