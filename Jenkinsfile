pipeline{
    agent any

    stages{

        stage("build"){

            steps{
                bat "npm install"
                bat "npx playwright install"
                echo 'building application'
            }

        }

        stage("test"){

            steps{
                bat 'npm run test'
                echo 'testing application'
            }

        }

        stage("deploy"){

            steps{
                echo 'Deploying application'
            }

        }

        post{
            success{
                    publishHTML (target : [allowMissing: false,alwaysLinkToLastBuild: true,keepAll: false,reportDir: 'test-results/',reportFiles: 'cucumber-report.html',reportName: 'Reports',reportTitles: 'Web Demo Store Reports'])
                }
            
        }

    }
}
