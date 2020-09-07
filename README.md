# ASU Daily Health Check

This script automatically submits the daily health check required by ASU. This works without the need for your password. Whoever wrote the cloud function behind this system decided not to verify the JWT secret server-side, allowing anyone to bypass authentication using spoofed tokens.

### How to Run

Deploy to Heroku using the button below and then configure the `Advanced Scheduler` add-on to run `yarn start` on the recurring interval `0 1 * * *` ("At 01:00 AM").

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/tfich/asu-health-check)
