const processRepoResults = (matches, dateScanned, applicationName, version) => {
    let repoResults = [];
    if(matches) {
        repoResults = matches.map(match => {
            return {
                dateScanned,
                projectName: applicationName,
                version,
                ruleId: match.ruleId,
                ruleName: match.ruleName,
                fileName: match.fileName,
                startLocationLine: match.startLocationLine,
                startLocationColumn: match.startLocationColumn,
                endLocationLine: match.endLocationLine,
                endLocationColumn: match.endLocationColumn
            }
        });
    }
    return repoResults;
};

const processTagCounters = (counters) => {
    const countersMeta = {
        logging: 0,
        functions: 0,
        exceptions: 0,
        classes: 0,
        urls: 0
    }
    counters.forEach(counter => {
        switch(counter.tag) {
            case "Metric.Code.Logging.Call":
                countersMeta.logging = counter.count;
                break;
            case "Metric.Code.Function.Defined":
                countersMeta.functions = counter.count;
                break;
            case "Metric.Code.Exception.Caught":
                countersMeta.exceptions = counter.count;
                break;
            case "Metric.Code.Class.Defined":
                countersMeta.classes = counter.count;
                break;
            case "Metric.Code.URL":
                countersMeta.urls = counter.count;
                break;
            default:
                break;
        };
    });
    return countersMeta;
};

module.exports = {
    processRepoResults,
    processTagCounters
}