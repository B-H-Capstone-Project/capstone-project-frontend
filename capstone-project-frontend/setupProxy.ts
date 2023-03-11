import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${process.env.BACKEND_IP}:8080`,
      changeOrigin: true,
    })
  );
};