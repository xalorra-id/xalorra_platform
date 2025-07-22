import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  experimental: {
    serverActions: false
  }
};

export default withNextIntl(nextConfig);
