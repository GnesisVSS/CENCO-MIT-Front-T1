import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
    app.use(
        '/user',
        createProxyMiddleware({
            target: 'https://talentalkeapi.netlify.app/.netlify/functions/user',
            changeOrigin: true,
        })
    );
};