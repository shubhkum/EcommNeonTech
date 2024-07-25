const response = (res, status, result = '') => {
    let desc  = ''
    switch(status) {
        case 200:
            desc = 'Ok'
            break
        case 201:
            desc = 'Created'
            break
        case 400:
            desc = 'Bad request'
            break
        case 401:
            desc = 'Unauthorized'
            break
        case 404:
            desc = 'Not found'
            break
        case 500:
            desc = 'Internal server error'
            break
        default:
            desc = ''
    }

    const isObj = (data) =>{
        return !!data && data.constructor === Object
    }

    const results = {
        status:status,
        description: desc,
        result: isObj(result) ? [result] : result
    }

    res.status(status).json(results)
}
module.exports = response