const asyncHandler = require('express-async-handler')
// @desc:       Get players
// @route:      GET /admin 
// @access      Private
const getPlayers = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get players' })
})

// @desc:       Post player
// @route:      POST /admin
// @access      Private
const postPlayer = asyncHandler(async (req, res) => { 
    console.log(req.body.text)
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text')
    }
    res.status(200).json({ message: 'Post player' })
})

// @desc:       Update player with the id of :id
// @route:      UPDATE /admin/:id
// @access      Private
const updatePlayer = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update player ${req.params.id}` })
})


// @desc:       Delete player with the id of :id
// @route:      DELETE /admin/:id
// @access      Private
const deletePlayer = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete player ${req.params.id}` })
})


module.exports = {
    getPlayers, postPlayer, updatePlayer, deletePlayer
}