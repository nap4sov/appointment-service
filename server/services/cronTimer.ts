const CronJob = require('cron').CronJob;
const updateOutdatedAppointments = require('./outdatedAppointments');
const { dailyReminder, hourlyReminder } = require('./logger');
const watchOutdatedAppointments = new CronJob('* * * * *', updateOutdatedAppointments);
const logToFileDaily = new CronJob('* * * * *', dailyReminder);
const logToFileHourly = new CronJob('* * * * *', hourlyReminder);

module.exports = { watchOutdatedAppointments, logToFileDaily, logToFileHourly };
