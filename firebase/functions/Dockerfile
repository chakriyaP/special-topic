FROM node:16

RUN apt-get update && \
  npm install -g firebase-tools && \
    apt-get install -y openjdk-11-jdk ca-certificates-java && \
    apt-get clean && \
    update-ca-certificates -f
ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64/
RUN export JAVA_HOME

RUN curl -sSL https://sdk.cloud.google.com | bash

ENV PATH $PATH:/root/google-cloud-sdk/bin

WORKDIR /firebase/functions

COPY package*.json ./

CMD npm install \
  && npm install --save firebase-functions@latest \
  && firebase use ${FIREBASE_PROJECT} --token ${FIREBASE_TOKEN} \
  && gcloud auth activate-service-account --key-file application_default_credentials.json \
  && npm run emulators

EXPOSE 4000 5000 5001 8080
