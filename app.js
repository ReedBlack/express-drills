const express = require('express');
// const cors = require('cors')
const morgan = require('morgan')
const app = express()
const data = require('./cohorts.js')

const port = process.env.PORT || 6000

app.use(morgan('dev'))
// app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.get("/", (request, response) => {
    response.status(200).json({
        data: data,
    })
})

app.get('/:id', (request, response) => {
    var cohortById = getDataById(data, request.params.id)
    if (!cohortById) {
        response.status(404).json({
            error: "Cohort does not exist at that id"
        })
    } else {
        response.json({
            cohort: cohortById
        })
    }
})


app.listen(port, () => {
    console.log(`server is running on ${port}`)
})

function getDataById(data, id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            return data[i]
        }
    }
    return null;
}

// console.log(getDataById(data, 1))