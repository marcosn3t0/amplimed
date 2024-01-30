const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "test-results",
  reportPath: "test-results/report/",
  reportName:"Playwright Demo Store Automation",
  pageTitle:"Demo Web Shop",
  displayDuration:true,
  metadata: {
    browser: {
      name: "chrome",
      version: "60",
    },
    device: "Marcos-PC",
    platform: {
      name: "windows 11",
      version: "16.04",
    },
  },
  customData: {
    title: "Test info",
    data: [
      { label: "Project", value: "Demo Web Shop" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "Smoke-1" },
    ],
  },
});