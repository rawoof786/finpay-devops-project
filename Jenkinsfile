pipeline {

    agent {
        label 'finpay-agent'
    }

    stages {

        stage('Environment') {
            steps {
                sh '''
                    echo "========== HOST =========="
                    hostname

                    echo "========== USER =========="
                    whoami

                    echo "========== JAVA =========="
                    java -version

                    echo "========== MAVEN =========="
                    mvn -version

                    echo "========== NODE =========="
                    node -v

                    echo "========== NPM =========="
                    npm -v

                    echo "========== GIT =========="
                    git --version
                '''
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                sh '''
                    cd user-service
                    mvn clean package

                    cd ../account-service
                    mvn clean package

                    cd ../payment-service
                    mvn clean package

                    cd ../transaction-service
                    mvn clean package
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                    cd frontend
                    npm ci
                    npm run lint
                    npm run build
                '''
            }
        }
    }

    post {
        success {
            echo 'FinPay CI SUCCESS'
        }

        failure {
            echo 'FinPay CI FAILED'
        }
    }
}
