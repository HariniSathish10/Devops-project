pipeline {
    agent any

    tools {
        jdk 'jdk-21'
        maven 'Maven'
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/HariniSathish10/Devops-project.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Test') {
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
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat '''
                    docker login -u %USER% -p %PASS%
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat '''
                    docker tag devops-project-app %USER%/devops-project-app:latest
                    docker push %USER%/devops-project-app:latest
                    '''
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                bat '''
                docker run -d -p 5000:5000 devops-project-app
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline Success"
        }
        failure {
            echo "Pipeline Failed"
        }
    }
}
