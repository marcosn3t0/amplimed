module.exports = {
    default : {
        tags :process.env.npm_config_TAGS || "",
        formatOptions : {
            snippetInterface : "async-await"
        },
        publishQuiet : false,
        dryRun : false,
        paths : [
            "src/test/features/*.feature"
        ],
        require : [
            "src/test/steps/*.ts",
            "src/hooks/hooks.ts"
        ],
        requireModule : [
            "ts-node/register"
        ],
        format:[
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json"
        ],
    }
}