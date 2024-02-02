const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

//getAllCoachs
const getAllCoachs = (req, res) => {
    //#swagger.tags=['coachs']
    const result = mongodb.getDatabase().db().collection("coach").find()
    result.toArray().then((coach) => {

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(coach);
    });
};

//getCoach
const getCoach = (req, res) => {
    //#swagger.tags=['Coachs']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid coach id to find a Coach.");
    }
    const coachId = new ObjectId(req.params.id);
    const result = mongodb.getDatabase().db().collection("coach").find({
        _id: coachId
    })
    result.toArray().then((coach) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(coach[0]);
    });
};

//postCoach
const postCoach = async (req, res) => {
    //#swagger.tags=['coachs']
    const coach = {
        name: req.body.name,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        country: req.body.country,
        city: req.body.city,
        coachingCareer: req.body.coachingCareer,
    };

    const response = await mongodb.getDatabase().db().collection("coach").insertOne(coach);
    if (response.acknowledge) {
        res.status(201).json(response);
    } else {
        res
            .status(500)
            .json(response.error || "Some error occurred while creating the Coach.");
    }
};

//putCoach
const putCoach = async (req, res) => {
    //#swagger.tags=['coachs']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid coach id to update a coach.');
    }
    const coachId = new ObjectId(req.params.id);
    const coach = {
        name: req.body.name,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        country: req.body.country,
        city: req.body.city,
        coachingCareer: req.body.coachingCareer,
    };

    const response = await mongodb.getDatabase().db().collection("coach").replaceOne({
        _id: coachId
    }, coach);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res
            .status(500)
            .json(
                response.error || "Some error occurred while updating the coach."
            );
    }
};

//deleteCoach
const deleteCoach = async (req, res) => {
    //#swagger.tags=['coachs']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid coach id to delete a coach.');
    }
    const coachId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("coach").deleteOne({
        _id: coachId
    }, true);
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res
            .status(500)
            .json(response.error || "Some error occurred while deleting the coach");
    }
};

module.exports = {
    getAllCoachs,
    getCoach,
    postCoach,
    putCoach,
    deleteCoach,
};