const express = require('express');
const morgan = require('morgan')
const games = require('./playstore.js')

const app = express();

app.use(morgan('dev'))

app.get('/', (req, res) => {
    const {sort, genres} = req.query;

    let results = games

    if (genres) {
        if (['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            results = games.filter(game => {
                return game['Genres'].includes(genres)
            })
        }
        else {
            return res.status(400).send('genres must be Action, Puzzle, Strategy, Casual, Arcade, or Card')
        }
    }

    if (sort) {
        if (['Rating', 'App'].includes(sort)) {
            results = results.sort((a, b) => {
                if (sort === 'App') {
                    a =a['App'].toLowerCase()
                    b = b['App'].toLowerCase()
                    console.log('app name lowercase', a)
                    console.log('app name lowercase b', b)
                    return a > b ? 1 : a < b ? -1 : 0;
                }
                return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
            })
        }
        else {
            return res.status(400).send('must sort by rating or app')
        }
    }

    res.json(results)

})

app.listen(8000, () => {
    console.log('listening at 8000')
})