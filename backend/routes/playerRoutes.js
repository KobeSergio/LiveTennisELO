const express = require('express')
const router = express.Router()
const { getPlayers, postPlayer, updatePlayer, deletePlayer } = require('../controller/playerController')


router.route('/').get(getPlayers).post(postPlayer)
router.route('/:id').put(updatePlayer).delete(deletePlayer)
 

module.exports = router;