pipeline {
    agent any
}
    tools {
        jdk 'jdk-21'
        maven 'Maven'
    }

    environment {
        IMAGE_NAME = "devops-project-app"
        CONTAINER_NAME = "devops-app"
        DOCKER_HUB = "your-dockerhub-username"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Workspace') {
            steps {
                bat 'dir'
            }
        }

        stage('Build Backend') {
    steps {
        dir('backend') {
            bat 'mvn clean package -DskipTests'
        }
    }
}

        stage('Run Tests') {
            steps {
                bat 'mvn test'
            }
        }

           stage('Build Docker Image') {
            steps {
                dir('backend') {
                    bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )]) {
                    bat 'echo %PASSWORD% | docker login -u %USERNAME% --password-stdin'
                }
            }
        }

        stage('Tag & Push Image') {
            steps {
                bat '''
                docker tag %IMAGE_NAME% %DOCKER_HUB%/%IMAGE_NAME%:latest
                docker push %DOCKER_HUB%/%IMAGE_NAME%:latest
                '''
            }
        }

        stage('Deploy Backend') {
            steps {
                bat '''
                docker stop %CONTAINER_NAME% || exit 0
                docker rm %CONTAINER_NAME% || exit 0

                docker run -d -p 5000:5000 --name %CONTAINER_NAME% ^
                %DOCKER_HUB%/%IMAGE_NAME%:latest
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline Success - Backend running on port 5000"
        }
        failure {
            echo "❌ Pipeline Failed"
        }
    }
}
