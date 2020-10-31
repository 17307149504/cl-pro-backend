module.exports = {
    port: 9000,
    cors: {
        origin: 'http://127.0.0.1:8000',
        credentials: true,//允许携带资源凭证
        headers: 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With',
        methods: 'PUT,POST,GET,DELETE,OPTIONS,HEAD',
    },
    session: {
        secret: 'wangchunli',
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1000*60*60*24*30},
    }
} 