pipeline {
agent any

stages {

    stage('Environment') {
        steps {
            sh 'echo "========== HOST ==========" && hostname'
            sh 'echo "========== USER ==========" && whoami'
            sh 'echo "========== JAVA ==========" && java -version'
            sh 'echo "========== MAVEN ==========" && mvn -version'
            sh 'echo "========== NODE ==========" && node -v'
            sh 'echo "========== NPM ==========" && npm -v'
            sh 'echo "========== GIT ==========" && git --version'
        }
    }

    stage('Checkout') {
        steps {
            checkout scm
        }
    }

    stage('Build Backend') {
        steps {
            sh 'cd user-service && mvn clean package'
            sh 'cd account-service && mvn clean package'
            sh 'cd payment-service && mvn clean package'
            sh 'cd transaction-service && mvn clean package'
            sh 'echo "========== BACKEND BUILD SUCCESS =========="'
        }
    }

    stage('Build Frontend') {
        steps {
            sh 'cd frontend && npm ci'
            sh 'cd frontend && npm run lint'
            sh 'cd frontend && npm run build'
            sh 'echo "========== FRONTEND BUILD SUCCESS =========="'
            sh 'ls -lah frontend/dist/'
        }
    }

    stage('Deploy Frontend to Nginx') {
        steps {
            sshagent(['finpay-deployment-ssh']) {

                sh 'ssh -o StrictHostKeyChecking=no ubuntu@172.31.10.30 "mkdir -p /tmp/finpay-dist && rm -rf /tmp/finpay-dist/*"'

                sh 'scp -o StrictHostKeyChecking=no -r frontend/dist/* ubuntu@172.31.10.30:/tmp/finpay-dist/'

                sh 'ssh -o StrictHostKeyChecking=no ubuntu@172.31.10.30 "sudo mkdir -p /var/www/finpay && sudo rm -rf /var/www/finpay/* && sudo cp -r /tmp/finpay-dist/* /var/www/finpay/ && sudo chown -R www-data:www-data /var/www/finpay && sudo nginx -t && sudo systemctl reload nginx"'

                sh 'echo "========== NGINX DEPLOYMENT SUCCESS =========="'
            }
        }
    }

    stage('Test SSH to Nginx') {
        steps {
            sshagent(['finpay-deployment-ssh']) {

                sh 'ssh -o StrictHostKeyChecking=no ubuntu@172.31.10.30 "hostname && whoami && ls -ld /tmp/finpay-dist && ls -lah /tmp/finpay-dist"'

                sh 'echo "========== SSH TEST SUCCESS =========="'
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
