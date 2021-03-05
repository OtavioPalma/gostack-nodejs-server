export default {
  jwt: {
    secret: process.env.APP_SECRET || 'init',
    expiresIn: '1d',
  },
};
