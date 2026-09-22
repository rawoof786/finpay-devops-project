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
                    echo "========== BUILD NUMBER =========="
                    echo "$BUILD_NUMBER"

                    echo "========== USER SERVICE =========="
                    docker build \
                        -t finpay-user-service:${BUILD_NUMBER} \
                        ./user-service

                    echo "========== ACCOUNT SERVICE =========="
                    docker build \
                        -t finpay-account-service:${BUILD_NUMBER} \
                        ./account-service

                    echo "========== PAYMENT SERVICE =========="
                    docker build \
                        -t finpay-payment-service:${BUILD_NUMBER} \
                        ./payment-service

                    echo "========== TRANSACTION SERVICE =========="
                    docker build \
                        -t finpay-transaction-service:${BUILD_NUMBER} \
                        ./transaction-service
                '''
            }
        }

        stage('Docker Images') {
            steps {
                sh '''
                    echo "========== FINPAY DOCKER IMAGES =========="

                    docker images | grep finpay

                    echo "========== CURRENT BUILD IMAGES =========="

                    docker images | grep ":${BUILD_NUMBER}"
                '''
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    sh '''
                        echo "========== DOCKER LOGIN =========="

                        echo "$DOCKER_PASSWORD" | docker login \
                            -u "$DOCKER_USERNAME" \
                            --password-stdin

                        echo "========== TAGGING IMAGES =========="

                        docker tag \
                            finpay-user-service:${BUILD_NUMBER} \
                            "$DOCKER_USERNAME/finpay-user-service:${BUILD_NUMBER}"

                        docker tag \
                            finpay-account-service:${BUILD_NUMBER} \
                            "$DOCKER_USERNAME/finpay-account-service:${BUILD_NUMBER}"

                        docker tag \
                            finpay-payment-service:${BUILD_NUMBER} \
                            "$DOCKER_USERNAME/finpay-payment-service:${BUILD_NUMBER}"

                        docker tag \
                            finpay-transaction-service:${BUILD_NUMBER} \
                            "$DOCKER_USERNAME/finpay-transaction-service:${BUILD_NUMBER}"

                        echo "========== PUSH USER SERVICE =========="

                        docker push \
                            "$DOCKER_USERNAME/finpay-user-service:${BUILD_NUMBER}"

                        echo "========== PUSH ACCOUNT SERVICE =========="

                        docker push \
                            "$DOCKER_USERNAME/finpay-account-service:${BUILD_NUMBER}"

                        echo "========== PUSH PAYMENT SERVICE =========="

                        docker push \
                            "$DOCKER_USERNAME/finpay-payment-service:${BUILD_NUMBER}"

                        echo "========== PUSH TRANSACTION SERVICE =========="

                        docker push \
                            "$DOCKER_USERNAME/finpay-transaction-service:${BUILD_NUMBER}"

                        echo "========== DOCKER LOGOUT =========="

                        docker logout
                    '''
                }
            }
        }

        stage('Test Deployment SSH') {
            steps {
                sshagent(['finpay-deployment-ssh']) {

                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@172.31.10.30 '
                            echo "========== SSH SUCCESS =========="

                            hostname

                            hostname -I

                            echo "========== DOCKER =========="

                            docker --version

                            echo "========== DOCKER COMPOSE =========="

                            docker compose version
                        '
                    '''
                }
            }
        }

        stage('Deploy to Server') {
            steps {

                sshagent(['finpay-deployment-ssh']) {

                    withCredentials([
                        usernamePassword(
                            credentialsId: 'dockerhub-creds',
                            usernameVariable: 'DOCKER_USERNAME',
                            passwordVariable: 'DOCKER_PASSWORD'
                        )
                    ]) {

                        sh '''
                            ssh -o StrictHostKeyChecking=no ubuntu@172.31.10.30 "
                                echo '========== DOCKER LOGIN =========='

                                echo '$DOCKER_PASSWORD' | docker login \
                                    -u '$DOCKER_USERNAME' \
                                    --password-stdin

                                echo '========== DEPLOYMENT DIRECTORY =========='

                                cd /opt/finpay

                                echo '========== PULL BUILD ${BUILD_NUMBER} =========='

                                export IMAGE_TAG=${BUILD_NUMBER}

                                docker compose pull

                                echo '========== START CONTAINERS =========='

                                docker compose up -d

                                echo '========== CONTAINER STATUS =========='

                                docker compose ps

                                echo '========== DOCKER LOGOUT =========='

                                docker logout
                            "
                        '''
                    }
                }
            }
        }

        stage('Health Check') {
            steps {

                sshagent(['finpay-deployment-ssh']) {

                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@172.31.10.30 '

                            echo "========== DEPLOYMENT STATUS =========="

                            cd /opt/finpay

                            docker compose ps

                            echo "========== USER SERVICE =========="

                            curl -I http://localhost:8081 || true

                            echo "========== ACCOUNT SERVICE =========="

                            curl -I http://localhost:8082 || true

                            echo "========== PAYMENT SERVICE =========="

                            curl -I http://localhost:8084 || true

                            echo "========== TRANSACTION SERVICE =========="

                            curl -I http://localhost:8083 || true

                            echo "========== HEALTH CHECK COMPLETED =========="

                        '
                    '''
                }
            }
        }
    }

    post {

        success {
            echo '========== FINPAY CI/CD SUCCESS =========='
            echo "========== BUILD NUMBER: ${BUILD_NUMBER} =========="
        }

        failure {
            echo '========== FINPAY CI/CD FAILED =========='
            echo "========== BUILD NUMBER: ${BUILD_NUMBER} =========="
        }

        always {
            echo '========== PIPELINE COMPLETED =========='
        }
    }
}
