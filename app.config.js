let Config = {
  apiUrl: 'http://192.168.0.166:5000/api/v1',
};

if (process.env.APP_ENV === 'production') {
  Config.apiUrl = 'https://express-catch-reports.herokuapp.com/api/v1';
} else if (process.env.APP_ENV === 'staging') {
  Config.apiUrl = 'https://express-catch-reports-staging.herokuapp.com/api/v1';
}

export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...Config,
    },
  };
};
