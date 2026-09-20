pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out FinPay source code'
            }
        }

        stage('Build') {
            steps {
                echo 'Building FinPay application'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests'
            }
        }

    }

    post {
        success {
            echo 'FinPay pipeline completed successfully'
        }

        failure {
            echo 'FinPay pipeline failed'
        }
    }
}
