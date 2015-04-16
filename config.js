// Set environment variables to configure the application.

module.exports = {

  email: process.env.ANALYTICS_REPORT_EMAIL,
  key_file: process.env.ANALYTICS_KEY_PATH,

  account: {
    ids: process.env.ANALYTICS_REPORT_IDS,
    // needed for realtime reports which don't include hostname
    // leave blank if your view includes hostnames
    hostname: process.env.ANALYTICS_HOSTNAME || ""
  },


};
