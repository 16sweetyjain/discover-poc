# Please update your base container regularly for bug fixes and security patches.
# See ethos.cloud.adobe.io/containers?tab=BBC for the latest BBC releases.
FROM docker-asr-release.dr.corp.adobe.com/asr/nodejs_v16:0.18.1 as builder

RUN mkdir /app

# Set the working directory in the container

WORKDIR /app

COPY . /app

RUN chmod +x build.sh

# Run the build.sh script
RUN ./build.sh

EXPOSE 3000

CMD ["npm", "run", "start"]
