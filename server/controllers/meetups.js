const Meetup = require('../models/meetups');
const User = require('../models/users')
exports.getSecret = function (req,res){
  return res.json({secret:'I am secret Message'})
}

// exports.getMeetups = function(req, res) {
//   Meetup.find({})
//         .populate('category')
//         .populate('joinedPeople')
//         .exec((errors, meetups) => {

//     if (errors) {
//       return res.status(422).send({errors});
//     }

//     return res.json(meetups);
//   });
// }

exports.getMeetups = function(req, res) {
  const {category} = req.query || {};
  const {location} = req.query || {}

  const findQuery = location ? Meetup.find({ processedLocation: { $regex: '.*' + location + '.*' } })
                             : Meetup.find({})
  findQuery
        .populate('category')
        .populate('joinedPeople')
        .limit(5)
        .sort({'createdAt': -1})
        .exec((errors, meetups) => {
    if (errors) {
      return res.status(422).send({errors});
    }

    // WARNING: requires improvement, can decrease performance
    if (category) {
      meetups = meetups.filter(meetup => {
        return meetup.category.name === category
      })
    }

    return res.json(meetups);
  });
}

exports.getMeetupById = function(req, res) {
  const {id} = req.params;

  Meetup.findById(id)
        .populate('meetupCreator', 'name id avatar')
        .populate('category')
        .populate({path: 'joinedPeople',
           options: {limit: 5, sort: {username: -1}}})
        .exec((errors, meetup) => {
    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(meetup);
  });
}


// Create Meetup
exports.createMeetup = function(req, res) {
  const meetupData = req.body;
  const user = req.user;

  const meetup = new Meetup(meetupData);
  meetup.user = user;
  meetup.status = 'active';

  meetup.save((err, createdMeetup) => {
    if (err) {
      return res.status(422).send({err});
    }

    return res.json(createdMeetup)
  })
}


exports.joinMeetup = function (req, res) {
  const user = req.user;
  const {id} = req.params;

  Meetup.findById(id, (err, meetup) => {

    if(err){
      return res.status(422).send({err})
    }

    meetup.joinedPeople.push(user);
    meetup.joinedPeopleCount++;

    return Promise.all(
      [meetup.save(),
      User.updateOne({ _id: user.id }, { $push: { joinedMeetups: meetup }})])
      .then(() => res.json({id}))
      .catch(err => res.status(422).send({err}))
  })
}

exports.leaveMeetup = function (req, res) {
  const user = req.user;
  const {id} = req.params;

  Promise.all(
    [Meetup.updateOne({ _id: id }, { $pull: { joinedPeople: user.id }, $inc: {joinedPeopleCount: -1}}),
     User.updateOne({ _id: user.id }, { $pull: { joinedMeetups: id }})])
    .then(() => res.json({id}))
    .catch(err => res.status(422).send({err}))
}


exports.updateMeetup = function (req, res) {
  const meetupData = req.body
  const {id} = req.params
  const user = req.user;

  if (user.id === meetupData.meetupCreator._id) {
    Meetup.findByIdAndUpdate(id, { $set: meetupData}, { new: true },
    (errors, updatedMeetup) => {
      if (errors) {
        return res.status(422).send({errors})
      }

      return res.json(updatedMeetup)
    })
  } else {
    return res.status(401).send({errors: {message: 'Not Authorized!'}})
  }
}
