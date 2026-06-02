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
        dir('backend') {
            bat 'mvn clean package -DskipTests'
        }
    }
}

stage('Run Tests') {
    steps {
        dir('backend') {
            bat 'mvn test'
        }
    }
}

stage('Build Docker Image') {
    steps {
        dir('backend') {
            bat 'docker build -t devops-project-app .'
        }
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
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
            bat '''
            docker login -u %USER% -p %PASS%
            docker tag devops-project-app %USER%/devops-project-app:latest
            docker push %USER%/devops-project-app:latest
            '''
        }
}
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
stage('Build Backend') {
    steps {
        dir('backend') {
            bat 'mvn clean package -DskipTests'
        }
    }
}
