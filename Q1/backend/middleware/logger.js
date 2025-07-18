const fs = require('fs');

module.exports = (req, res, next) => {
  const entry = `${new Date().toISOString()} ${req.method} ${req.originalUrl}\n`;
  fs.appendFileSync('request_log.txt', entry);
  next();
};
