import jwt from 'jsonwebtoken'

module.exports =  (request, response ,next) => {
    const authorization = request.get('authorization')
    
    let token2= ''
    
    if( authorization && authorization.toLoweCase().startsWith ('bearer')){
        token2 = authorization.substring(7)
    }
    
    const decodedToken = jwt.verify(token2, process.env.SECRET)
    
    if(!token2 || !decodedToken.id){
        return {
            body:{
                status: 401,
                message: 'no hay token, o es invalido'
            }
        }
    }
    next() 
}