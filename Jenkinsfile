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
                    echo "========== USER SERVICE =========="
                    cd user-service
                    mvn clean package

                    echo "========== ACCOUNT SERVICE =========="
                    cd ../account-service
                    mvn clean package

                    echo "========== PAYMENT SERVICE =========="
                    cd ../payment-service
                    mvn clean package

                    echo "========== TRANSACTION SERVICE =========="
                    cd ../transaction-service
                    mvn clean package
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                    echo "========== FRONTEND BUILD =========="

                    cd frontend

                    npm ci
                    npm run lint
                    npm run build

                    echo "========== FRONTEND BUILD SUCCESS =========="
                    ls -lah dist/
                '''
            }
        }

        stage('Deploy Frontend to Nginx') {
            steps {
                sshagent(['finpay-deployment-ssh']) {
                    sh '''
                        echo "========== PREPARE REMOTE DIRECTORY =========="

                        ssh -o StrictHostKeyChecking=no \
                            ubuntu@172.31.10.30 \
                            "rm -rf /tmp/finpay-dist && mkdir -p /tmp/finpay-dist"

                        echo "========== COPY FRONTEND =========="

                        scp -o StrictHostKeyChecking=no -r \
                            frontend/dist/* \
                            ubuntu@172.31.10.30:/tmp/finpay-dist/

                        echo "========== DEPLOY TO NGINX =========="

                        ssh -o StrictHostKeyChecking=no \
                            ubuntu@172.31.10.30 \
                            "sudo mkdir -p /var/www/finpay && \
                             sudo rm -rf /var/www/finpay/* && \
                             sudo cp -r /tmp/finpay-dist/* /var/www/finpay/ && \
                             sudo chown -R www-data:www-data /var/www/finpay && \
                             sudo nginx -t && \
                             sudo systemctl reload nginx"

                        echo "========== NGINX DEPLOYMENT SUCCESS =========="
                    '''
                }
            }
        }

        stage('Test SSH to Nginx') {
            steps {
                sshagent(['finpay-deployment-ssh']) {
                    sh '''
                        echo "========== SSH TEST =========="

                        ssh -o StrictHostKeyChecking=no \
                            ubuntu@172.31.10.30 \
                            "hostname && whoami && ls -ld /tmp/finpay-dist && ls -lah /tmp/finpay-dist"

                        echo "========== SSH TEST SUCCESS =========="
                    '''
                }
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


