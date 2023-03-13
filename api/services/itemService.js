const itemDao = require('../models/itemDao')

const floralTeabags = async (data) => {
    const seeFloralTeabags = await itemDao.seeFloralTeabags(data);
    return seeFloralTeabags;
}

const herbalTeabagsList = async (data) => {
    const seeHerbalTeabags = await itemDao.seeHerbalTeabags(data);
    return seeHerbalTeabags;
}

const citrusTeabagsList = async (data) => {
    const seeCitrusTeabags = await itemDao.seeCitrusTeabags(data);
    return seeCitrusTeabags;
}

const floralTeacupsList = async (data) => {
    const seeFloralTeacups = await itemDao.seeFloralTeacups(data);
    return seeFloralTeacups;
}

const herbalTeacupsList = async (data) => {
    const seeHerbalTeacups = await itemDao.seeHerbalTeacups(data);
    return seeHerbalTeacups;
}

const citrusTeacupsList = async (data) => {
    const seeCitrusTeacups = await itemDao.seeCitrusTeacups(data);
    return seeCitrusTeacups;
}

module.exports = {
    floralTeabags,
    herbalTeabagsList,
    citrusTeabagsList,
    floralTeacupsList,
    herbalTeacupsList,
    citrusTeacupsList
}

