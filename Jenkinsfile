pipeline {
    agent {
        docker {
            image 'node:18'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        APP_NAME = "spotify-clone"
        DOCKER_IMAGE = "javafever/${APP_NAME}"
        DOCKER_CREDENTIALS = credentials('dockerhub-credentials')
    }
    environment {
    

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/prince10arya/spotify-clone'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                    sh "docker push $DOCKER_IMAGE"
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deployment step (can be Docker run, K8s, etc.)"
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
}

