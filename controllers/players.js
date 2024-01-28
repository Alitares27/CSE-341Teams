const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll =  (req, res) => {
  //#swagger.tags=['Players']
  const result =  mongodb.getDatabase().db().collection("player").find()
  result.toArray().then((player) => {
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(player);
  });
};

const getSingle = (req, res) => {
  //#swagger.tags=['Players']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid player id to find a player.");
  }
  const playerId = new ObjectId(req.params.id);
  const result = mongodb.getDatabase().db().collection("player").find({
    _id: playerId
  })
  result.toArray().then((player) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(player[0]);
  });
};

const createPlayer = async (req, res) => {
  //#swagger.tags=['players']
  const player = {
    name: req.body.name,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    country: req.body.country,
    city: req.body.city,
    naFoTeam: req.body.naFoTeam,
    club: req.body.club,
    position: req.body.position,
  };

  const response = await mongodb.getDatabase().db().collection("player").insertOne(player);
  if (response.acknowledge) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the player.");
  }
};

const updatePlayer = async (req, res) => {
  //#swagger.tags=['players']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a player.');
  }
  const playerId = new ObjectId(req.params.id);
  const player = {
    name: req.body.name,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    country: req.body.country,
    city: req.body.city,
    naFoTeam: req.body.naFoTeam,
    club: req.body.club,
    position: req.body.position,
  };

  const response = await mongodb.getDatabase().db().collection("player").replaceOne({_id: playerId}, player);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the player."
      );
  }
};

const deletePlayer = async (req, res) => {
  //#swagger.tags=['players']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a player.');
  }
  const playerId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection("player").deleteOne({_id: playerId}, true);
  if (response.deleteCount >= 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the player");
  }
};

module.exports = {
  getAll,
  getSingle,
  createPlayer,
  updatePlayer,
  deletePlayer,
};