import { createProxyMiddleware } from 'http-proxy-middleware';
import env from "ts-react-dotenv";

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://localhost:8080`,
      changeOrigin: true,
    })
  );
};