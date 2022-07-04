# Process Manager 2 (PM2)

<br/>Install globally

```
.\> npm i -g pm2
```

<br/>Start application

```
.\> pm2 start app/main.js [-i <number>] [--watch]
```

*where:*

- *-i <number>* - (optional) specifies the number of clusters to start. A value of -1 will startup the max number of clusters possible.
- *--watch* - (optional) used to tell pm2 to watch the files and restart if any file changes.

<br/>Get status

```
.\> pm2 status
```

<br/> View logs

```
.\> pm2 logs
```

<br/> Stop process

```
.\> pm2 stop <all / name / id>
```

<br/> Clear status table

```
.\> pm2 delete <all / name / id>
```

<br/> Restart

```
.\> pm2 restart <all / name / id>
```

<br/> Live monitor

```
.\> pm2 monit
```

<br/>

## References

- [PM2 Home](https://pm2.keymetrics.io)
- [Use PM2 for Node Js Applications | 2020](https://www.youtube.com/watch?v=ebdKIU6SDHI)
- [Node JS - Scaling Applications - PM2](https://www.youtube.com/watch?v=iHzoQy1jx7M)

