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
        stage('Deploy Frontend to Nginx') {
    steps {
        sshagent(['finpay-deployment-ssh']) {
            sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@172.31.10.30 \
                    "sudo rm -rf /tmp/finpay-dist && sudo mkdir -p /tmp/finpay-dist"

                scp -o StrictHostKeyChecking=no -r frontend/dist/* \
                    ubuntu@172.31.10.30:/tmp/finpay-dist/

                ssh -o StrictHostKeyChecking=no ubuntu@172.31.10.30 \
                    "sudo rm -rf /var/www/finpay/* &&
                     sudo cp -r /tmp/finpay-dist/* /var/www/finpay/ &&
                     sudo nginx -t &&
                     sudo systemctl reload nginx"
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
