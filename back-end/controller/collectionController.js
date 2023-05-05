const catchAsync = require("../utils/catchAsync.js");
const AppError = require("./../utils/appError.js");
const Collection = require("./../model/collectionModel");

exports.createCollection = catchAsync(async (req, res, next) => {

  const collection = await Collection.create(req.body);

  res.status(201).json({
    status: "success",
    collection,
  });
});

exports.getCollection = catchAsync(async (req, res, next) => {
  const metadata_id = req.params.metadata_id;

  const collection = await Collection.findOne({ metadata_id });

  if (!collection) {
    return next(new AppError("No collection found with that MetaData ID", 404));
  }

  res.status(200).json({
    status: "success",
    collection,
  });
});

exports.getCollections = catchAsync(async (req, res, next) => {
  const collection = await Collection.find();

  res.status(200).json({
    status: "success",
    collection,
  });
});

exports.deleteCollection = catchAsync(async (req, res, next) => {
  const metadata_id = req.params.metadata_id;

  const isCollection = await Collection.findOne({ metadata_id });

  if (!isCollection) {
    return next(new AppError("No document found with that ID", 404));
  }

  const collection = await Collection.deleteOne({ metadata_id });

  res.status(204).json({
    status: "success",
    msg: "Collection Deleted",
    collection,
  });
});
