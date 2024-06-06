const nextTranslate = require('next-translate-plugin');
const config = {
	swcMinify: true,
	reactStrictMode: false,
	compress: true,
	env: {
		API_URL: process.env.API_URL,
		API_URL_MEDIA: process.env.API_URL_MEDIA,
		MONGO_URL: process.env.MONGO_URL,
		ADMINS: process.env.ADMINS,
		TOKEN: process.env.TOKEN,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
		OPENCAGE_API_KEY: process.env.OPENCAGE_API_KEY,
	},
	images: {
		remotePatterns: [
			{
				hostname: 'res.cloudinary.com',
			},
			{
				hostname: 'http://194.195.86.67',
				port: '606',
			},
		],
		minimumCacheTTL: 60,
	},
	async rewrites() {
		return [
			{
				source: '/:path*',
				destination: 'http://194.195.86.67:606/:path*',
			},
		];
	},
	i18n: {
		locales: ['en', 'ar'],
		defaultLocale: 'en',
	},
};
module.exports = nextTranslate(config);
