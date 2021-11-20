import { handle } from "src/hooks_old"

const ERROR_HANDLERS = {
    CastError: res => res.status(400).send({error: 'error de casteo'}),
    JsonWebTokenError: (res, error) => res.status(401).json({error: 'token invalido'}),
    defaultError: res=> res.status(500).end() 
}

module.exports = (error, request, response, next)=> {
    const handler= 
    ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

    handler(response,error)
}
