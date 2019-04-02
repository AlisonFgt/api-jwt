import { Injectable } from 'injection-js';
import { Topic } from './topics.model';

@Injectable()
export class TopicsController {
  isLive(req, res) {
    res.status(200).send("It's Ok");
  }

  //- GET - /topics # returns all topics
  list(req, res) {
    let topics = Topic.find((err: any, topics: any) => {
      if (err) {
        res.send(err)
      } else {
        res.status(200).send(topics);
      }
    })
  }
  //- PUT - /topic  # inserts a new topic into the table
  create(req,res) {
    let topic = new Topic(req.body);

    topic.save((err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(topic);
      }
    })
  }
  //- GET - /topic/{1} # returns a topic with id 1
  find(req,res) {
    Topic.findById(req.params.id, (err: any, topic: any) => {
      if (err) {
        res.send(err);
      } else {
          res.send(topic);
      }
    })
  }
  //- DELETE - /topic/{1} # deletes a topic with id of 1
  delete(req,res) {
    Topic.deleteOne({ _id: req.params.id }, (err: any) => {
      if (err) {
            res.send(err);
      } else {
          res.send("Sucessfully Deleted the Topic");
      }
    })
  }
  //- POST - /topic/{1} # update a topic with id of 1
  update(req,res) {
    Topic.findByIdAndUpdate(req.params.id, req.body, (err: any, topic: any) => {
      if (err) {
          res.send(err);
      } else {
          res.send("Sucessfully Update Topic");
      }
    })
  }
}
