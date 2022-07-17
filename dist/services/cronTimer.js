var CronJob = require('cron').CronJob;
var updateOutdatedAppointments = require('./outdatedAppointments');
var _a = require('./logger'), dailyReminder = _a.dailyReminder, hourlyReminder = _a.hourlyReminder;
var watchOutdatedAppointments = new CronJob('* * * * *', updateOutdatedAppointments);
var logToFileDaily = new CronJob('* * * * *', dailyReminder);
var logToFileHourly = new CronJob('* * * * *', hourlyReminder);
module.exports = { watchOutdatedAppointments: watchOutdatedAppointments, logToFileDaily: logToFileDaily, logToFileHourly: logToFileHourly };
