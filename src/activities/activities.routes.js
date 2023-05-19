const express = require('express');
const controller = require('./activities.controller');
const middleware = require('../common/jwt.middleware');

const ActivitiesRoutes = express.Router();
const control = new controller();
const middle = new middleware();

ActivitiesRoutes.route('/')
    .get([control.listActivities])
    .post([
        control.createActivity
    ])

ActivitiesRoutes.route('/:userId')
    .get([control.listActivitiesByUser])

ActivitiesRoutes.route('/:activityId')
    .get([control.getActivityById])
    .patch([
        middle.verifyJWT,
        control.updateActivity
    ])
    .delete([
        middle.verifyJWT, 
        control.deleteActivity
    ])

ActivitiesRoutes.route('/:activityId/like')
    .post([control.likeActivity])

module.exports = ActivitiesRoutes;