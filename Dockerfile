FROM node:22-alpine
RUN apk add -U tzdata
ENV TZ=Asia/Colombo
RUN cp /usr/share/zoneinfo/Asia/Colombo /etc/localtime
RUN mkdir /app
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000

