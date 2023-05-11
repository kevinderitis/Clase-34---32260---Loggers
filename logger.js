import winston from 'winston';
import * as dotenv from 'dotenv'
dotenv.config()

let logger;

const buildProdLogger = () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({ level: 'info'}),
            new winston.transports.File({ filename: './file.log', level: 'warn' })
        ]
    })
    return logger;
}

const buildDevLogger = () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({ level: 'silly'}),
            new winston.transports.File({ filename: './file.log', level: 'info' })
        ]
    })
    return logger;
}

if(process.env.ENV === 'production'){
    logger = buildProdLogger()
}else{
    logger = buildDevLogger()
}

export const addLogger = (req, res, next) => {
    req.logger = logger;
    next()
}