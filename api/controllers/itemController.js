const {itemService} = require('../services');
const {catchAsync} = require("../utils/error");

const floralTeabags = catchAsync ((req, res) => {
    try {
        const data = req.query;
        const items = itemService.floralTeabags(data)
        res.status(200).json({items})
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({message: err.message})
    }
})

const herbalTeabags = catchAsync ((req, res) => {
    try {
        const data = req.query;
        const items = itemService.herbalTeabagsList(data);
        res.status(201).json({items})
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({message: err.message})
    }
})

const citrusTeabags = catchAsync ((req, res) => {
    try {
        const data = req.query;
        const items =  itemService.citrusTeabagsList(data);
        res.status(201).json({items})
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({message: err.message})
    }
})

const floralTeacups = catchAsync ((req, res) => {
    try {
        const data = req.query;
        const items = itemService.floralTeacupsList(data);
        res.status(200).json({items})
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({message: err.message})
    }
})

const herbalTeacups = catchAsync ((req, res) => {
    try {
        const data = req.query;
        const items =  itemService.herbalTeacupsList(data);
        res.status(201).json({items})
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({message: err.message})
    }
})

const citrusTeacups = catchAsync ((req, res) => {
    try {
        const data = req.query;
        const items = itemService.citrusTeacupsList(data);
        res.status(201).json({items})
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({message: err.message})
    }
})

module.exports = {
    floralTeabags,
    herbalTeabags,
    citrusTeabags,
    floralTeacups,
    herbalTeacups,
    citrusTeacups
}