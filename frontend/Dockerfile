FROM node:20 as build

WORKDIR /app
COPY package*.json ./

RUN npm install -g @angular/cli@17.3.2
RUN npm ci
COPY . .

RUN ng build --configuration production --output-hashing none

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
