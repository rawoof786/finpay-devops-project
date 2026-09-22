pipeline {

    agent any

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

                    echo "========== DOCKER =========="
                    docker --version

                    echo "========== DOCKER ACCESS =========="
                    docker ps
                '''
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Project Validation') {
            steps {
                sh '''
                    echo "========== PROJECT =========="
                    pwd

                    echo "========== DOCKERFILES =========="
                    find . -type f -name Dockerfile -print

                    echo "========== JARS =========="
                    find . -type f -name "*.jar" -print
                '''
            }
        }

        stage('Build Backend') {
            steps {
                sh '''
                    cd user-service
                    mvn clean package -DskipTests

                    cd ../account-service
                    mvn clean package -DskipTests

                    cd ../payment-service
                    mvn clean package -DskipTests

                    cd ../transaction-service
                    mvn clean package -DskipTests
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

        stage('Docker Build') {
            steps {
                sh '''
                    echo "========== USER SERVICE =========="
                    docker build -t finpay-user-service:latest ./user-service

                    echo "========== ACCOUNT SERVICE =========="
                    docker build -t finpay-account-service:latest ./account-service

                    echo "========== PAYMENT SERVICE =========="
                    docker build -t finpay-payment-service:latest ./payment-service

                    echo "========== TRANSACTION SERVICE =========="
                    docker build -t finpay-transaction-service:latest ./transaction-service
                '''
            }
        }

        stage('Docker Images') {
            steps {
                sh '''
                    echo "========== FINPAY DOCKER IMAGES =========="

                    docker images | grep finpay
                '''
            }
        }
    }

    post {

        success {
            echo '========== FINPAY CI SUCCESS =========='
        }

        failure {
            echo '========== FINPAY CI FAILED =========='
        }

        always {
            echo '========== PIPELINE COMPLETED =========='
        }
    }
}
