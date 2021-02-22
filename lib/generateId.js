const generateId = (list) => {
    const maxId = Math.max(...list.map(item => item.id))
    return maxId + 1
}

module.exports = generateId