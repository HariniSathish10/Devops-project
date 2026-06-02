pipeline {
    agent any

    tools {
        maven 'Maven'
        jdk 'jdk-21'
    }

    environment {
        IMAGE_NAME = "ecommerce-backend"
        DOCKER_HUB = "your-dockerhub-username"
        CONTAINER_NAME = "backend-app"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/HariniSathish10/Devops-project.git'
            }
        }

        stage('Build Backend') {
            steps {
                bat 'mvn clean package -DskipTests'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'mvn test'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD')]) {

                    bat 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                }
            }
        }

        stage('Push Image') {
            steps {
                bat '''
                docker tag $IMAGE_NAME $DOCKER_HUB/$IMAGE_NAME:latest
                docker push $DOCKER_HUB/$IMAGE_NAME:latest
                '''
            }
        }

        stage('Deploy Backend') {
            steps {
                bat '''
                docker stop backend || true
                docker rm backend || true

                docker run -d -p 5000:5000 --name backend \
                $DOCKER_HUB/$IMAGE_NAME:latest
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Backend deployed on port 5000"
        }
        failure {
            echo "❌ Pipeline failed"
        }
    }
}
