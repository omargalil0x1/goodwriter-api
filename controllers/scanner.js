let parseText = require('./parser.js')

async function index (request, response) {

    if(request.body.length == 0) {

        return response.status(400).json({
            'Message': 'User didn\'t provide any text yet'
        })

    } else {

        let results = await parseText.parse(request.body)

        if(results.length == 0) {

            return response.status(200).json({
                'Message': 'No Mistakes Found!'
            })

        } else if(results.length > 0) {

            return response.status(200).json({
                'Mistakes': results,
            })

        } else {
            return response.status(200).json({
                'done': results,
            })
        }


    }
}


module.exports = { index }
