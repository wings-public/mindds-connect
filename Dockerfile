FROM node:14.16.1
WORKDIR  /samplecatalogapi
COPY . .
RUN npm install
#CMD [ "npm", "start" ]