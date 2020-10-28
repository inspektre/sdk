const supportedNameTags = [
    "Cryptograph",
    "Authentication",
    "Authorization",
    "LDAP",
    "Deserialization",
    "SQL",
    "Credentials"
];


const supportedTypes = [
    "owasp-2017",
    "hw",
    "sw",
    "software-fault-patterns",
    "architecture",
    "top-25"
];

const generateMeta = (data) => {
    const meta = {};
    meta.name = data.metaData.applicationName;
    meta.lastUpdated = data.metaData.lastUpdated;
    meta.dateScanned = data.metaData.dateScanned;
    meta.tags = [];
    
    data.metaData.uniqueTags.forEach(uTag => {
        supportedNameTags.forEach(sTag => {
            if(uTag.indexOf(sTag) > -1) {
                meta.tags.push(sTag);
            }
        });
    });
    meta.tags = [...new Set(meta.tags)];
    meta.tags = meta.tags.map(tag => {
        return {name_contains: tag};
    });
    console.log(meta.tags);
};

module.exports = {
    generateMeta
}