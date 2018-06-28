#!/bin/env groovy
library 'pipeline-library'
pipeline {
    agent none
    environment {
        APP_NAME = "pipeline-home"
        S3_BUCKET = "jph-test-bucket.liatr.io"
        AWS_ACCESS_KEY_ID = credentials('AWSaccess')
        AWS_SECRET_ACCESS_KEY = credentials('AWSsecret')
        AWS_DEFAULT_REGION = 'us-west-2'
        SLACK_ROOM = "${APP_NAME}"
        STAGE = ''
    }
    stages {
        stage('Build & Test') {
            agent {
                docker {
                    image 'node:10.5-alpine'
                }
            }
            steps {
                script {
                    STAGE = env.STAGE_NAME
                    sh "yarn install --production && yarn run test && yarn run build"
                }
            }
        }
        stage('Deploy') {
            agent {
                docker {
                    image 'mesosphere/aws-cli:1.14.5'
                }
            }
            steps {
                script {
                    STAGE = env.STAGE_NAME
                    sh "./aws.sh s3 sync ../build/ s3://${S3_BUCKET} --delete"
                }
            }
        }
    }
    post {
        failure {
            slackSend channel: env.SLACK_ROOM, color: 'danger', message: "Pipeline failed at stage: <${RUN_DISPLAY_URL}|${STAGE}>"
        }
    }
}