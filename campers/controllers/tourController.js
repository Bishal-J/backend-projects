exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide a name and a price.",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.username);
  res.status(200).json({
    status: "success",
    data: [
      {
        id: 1,
        title: "The mountain climber",
      },
    ],
  });
};

exports.getTour = (req, res) => {
  const tourId = "67c65fd1efcf9abe450ea85d";
  res.status(200).json({
    status: "success",
    data: {
      id: 1,
      title: "The mountain climber",
    },
  });
};

exports.createTour = (req, res) => {
  console.log(req.body);
  res.send("Done");
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Updated tour here..",
  });
};

exports.deleteTour = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "Updated tour here..",
  });
};
