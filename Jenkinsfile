pipeline{
    agent any

    stages{

        stage("build"){

            steps{
                sh 'npx playwright install --with-deps'
                sh 'npm install --save @types/node'
                sh 'npm install --save-dev cross-env'
                sh 'npm install dotenv --save'
                sh 'npm install fs-extra'
                sh 'npm install multiple-cucumber-html-reporter --save'
                sh 'npm install multiple-cucumber-html-reporter --save-dev'
                sh 'npm install @cucumber/cucumber'
                sh 'npm install -D ts-node'
                echo 'building application'
            }

        }

        stage("test"){

            steps{
                sh 'npm run test'
                echo 'testing application'
            }

        }

        stage("deploy"){

            steps{
                echo 'Deploying application'
            }

        }

    }
}