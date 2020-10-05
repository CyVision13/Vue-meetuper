module.exports = function(io) {
  io.on("connection", function(socket) {
    console.log("connection has been established");
    socket.on("meetup/subscribe", function(meetupId) {
      console.log("joining meetup", `meetup-${meetupId}`);
      socket.join(`meetup-${meetupId}`);
    });
    socket.on("meetup/unsubscribe", function(meetupId) {
      console.log("Leaving meetup", `meetup-${meetupId}`);
      socket.leave(`meetup-${meetupId}`);
    });
    socket.on('meetup/postSaved',function(post){
        console.log('emitting to meetup',`meetup-${post.threadId}`);
        socket.to(`meetup-${post.meetup}`).emit('meetup/postPublished',post)
    })

  });
};

//  // This is coming from our client
//  socket.on('meetup/postSave',function(post){
//     // This is going to our clients
//     io.emit('meetup/postPublished',post)
// })
