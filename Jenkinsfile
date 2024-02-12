pipeline{
    agent any

    stages{

        stage("build"){

            steps{
                bat "npm install"
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
