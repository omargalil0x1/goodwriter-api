const index = (request, response) => {
    response.status(404).json({
        'error': '404 NOT FOUND'
    })
}


module.exports = { index }
