import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://06ef13a2d8363372a71797a85369d683@o4511520516472832.ingest.us.sentry.io/4511520517652480",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
