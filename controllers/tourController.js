/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-console */
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  if (Number(req.params.id) > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res.status(400).json({
      status: 'Error',
      message: 'Bad request',
    });
  next();
};

exports.getAllTours = (req, res) => {
  console.log('This is from all the tours');
  res.status(200).send({
    status: 200,
    result: tours.length,
    time: req.requestTime,
    tours,
  });
};

exports.getTour = (req, res) => {
  console.log('This is from the only tour');
  const tour = tours.find((el) => el.id === Number(req.params.id));

  res.status(200).send({
    status: 200,

    tour,
  });
};

exports.createNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId };

  tours.push(newTour);
  // console.log(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated the tour>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
