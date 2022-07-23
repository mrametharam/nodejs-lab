# Winston Logger

## Nodemon

```
start: nodemon --inspect --watch app --ext js .
```

* --inspect - a great way to debug a running project. Open up the chrome browser and set the URL to chrome://inspect
*  --watch <path> - specify the folders to monitor for file changes.
*  --ext or -e - a comma delimeted list of extensions to monitor. This is a great way to prevent restarts when saving json files.

<br>

> An alternative to this is to use a [config](https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md) file.

### Restarting

Another way to restart is to type `rs` and hit enter in the console.


## Packages

- [Winston](https://www.npmjs.com/package/winston) - A logger for just about everything.
- [winston-daily-rotate-file](https://www.npmjs.com/package/winston-daily-rotate-file) - A transport for winston which logs to a rotating file.
- [chalk](https://www.npmjs.com/package/chalk) - Terminal string styling done right.
- [moment](https://www.npmjs.com/package/moment) - A JavaScript date library for parsing, validating, manipulating, and formatting dates.


## To Do's

- [Create a Logger with Node.js](https://www.youtube.com/watch?v=ppeyFBvHV6k)
- [Safing.io](https://safing.io)
- [Let's Encrypt](https://letsencrypt.org/)
- Grafix: Gimp, Krita, Inkscape, DarkTable
- Audio: Audacity
- Productivity: OnlyOffice
- Video: KDenLive, Handbrake, 
- Log Viewers: GrayLog, Nagios, Elastic Stack, FluentD, Advanced Log Viewer


## References

- [Node winston logging | logging in Node](https://www.youtube.com/watch?v=A5YiqaQbsyI&t=331s)
- [💎 How does winston keep configured loggers across multiple files](https://github.com/winstonjs/winston/issues/1275)
- [Moment Documentation](https://momentjs.com)
- [5 useful open source log analysis tools](https://opensource.com/article/19/4/log-analysis-tools)
- [Top 12 Open Source Log Analysis Tools](https://www.hitechnectar.com/blogs/open-source-log-analysis-tools/)