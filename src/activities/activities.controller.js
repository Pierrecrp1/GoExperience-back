const model = require('./activities.model');

class activitiesController {
    async listActivities(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        const result = await model.find({})
        res.send(result);
    }

    async listActivitiesByUser(req, res) {
        const result = await model.find({id_owner:req.params.userId})
        res.send(result);
    }
    
    async getActivityById(req, res) {
        var result = await model.find({_id:req.params.activityId})
        res.send(result);
    }
    
    async createActivity(req, res) {
        await model(req.body).save()
            .then((activityCreated)=>{res.status(201).send(activityCreated);})
            .catch((err)=>{console.log(err); res.status(400).send(err)})
    }
    
    async updateActivity(req, res) {
        delete req.body['activityId'];

        await model
          .findOneAndUpdate({ _id: req.params.activityId }, req.body)
          .then((activityUpdated) => {
            res.send(activityUpdated);
          })
          .catch((err) => {
            res.send(err);
          });
    }
    
    async deleteActivity(req, res) {
        await model
          .deleteActivity({ _id: req.params.activityId })
          .then((deleted) => {
            res.send(deleted);
          })
          .catch((err) => {
            res.send(err);
          });
    }

    async likeActivity(req, res) {
      try {
        const activity = await model.findOne({ _id: req.params.activityId });
    
        if (activity.likes.includes(req.body.userId)) {
          activity.likes.pull(req.body.userId);
        }

        else {
          activity.likes.push(req.body.userId);
        }
        
        const activityUpdated = await activity.save();
        res.send(activityUpdated);
      } catch (err) {
        res.status(500).send(err);
      }
    }
}

module.exports = activitiesController;