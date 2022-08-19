const path = require('path');

const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  i18n,
  webpack: (config, { dev }) => {
    config.module.rules.push({ test: /\.test.tsx$/, loader: 'ignore-loader' });
    return config;
  },
};
