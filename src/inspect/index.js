const { generateMeta } = require('./generateMeta');

const inspect = (data) => {
    const meta = generateMeta(data);
    console.log(meta);
}


module.exports = {
    inspect
}