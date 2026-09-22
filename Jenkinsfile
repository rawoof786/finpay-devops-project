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
                        echo "$DOCKER_PASSWORD" | docker login \
                            -u "$DOCKER_USERNAME" \
                            --password-stdin

                        docker tag finpay-user-service:latest \
                            "$DOCKER_USERNAME/finpay-user-service:latest"

                        docker tag finpay-account-service:latest \
                            "$DOCKER_USERNAME/finpay-account-service:latest"

                        docker tag finpay-payment-service:latest \
                            "$DOCKER_USERNAME/finpay-payment-service:latest"

                        docker tag finpay-transaction-service:latest \
                            "$DOCKER_USERNAME/finpay-transaction-service:latest"

                        docker push "$DOCKER_USERNAME/finpay-user-service:latest"
                        docker push "$DOCKER_USERNAME/finpay-account-service:latest"
                        docker push "$DOCKER_USERNAME/finpay-payment-service:latest"
                        docker push "$DOCKER_USERNAME/finpay-transaction-service:latest"

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
                            docker --version
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
                                echo '$DOCKER_PASSWORD' | docker login \
                                    -u '$DOCKER_USERNAME' \
                                    --password-stdin

                                cd /opt/finpay

                                docker compose pull

                                docker compose up -d

                                docker compose ps

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
                        '
                    '''
                }
            }
        }
    }

    post {

        success {
            echo '========== FINPAY CI/CD SUCCESS =========='
        }

        failure {
            echo '========== FINPAY CI/CD FAILED =========='
        }

        always {
            echo '========== PIPELINE COMPLETED =========='
        }
    }
}
