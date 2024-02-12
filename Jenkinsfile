pipeline{
    agent any

    stages{

        stage("build"){

            steps{
                bat 'npx playwright install --with-deps'
                bat 'npm install --save @types/node'
                bat 'npm install --save-dev cross-env'
                bat 'npm install dotenv --save'
                bat 'npm install fs-extra'
                bat 'npm install multiple-cucumber-html-reporter --save'
                bat 'npm install multiple-cucumber-html-reporter --save-dev'
                bat 'npm install @cucumber/cucumber'
                bat 'npm install -D ts-node'
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

    }
}
