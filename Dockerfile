FROM node:20-alpine AS build

RUN npm install -g npm@11.0.0

WORKDIR /app

# Set environment variable
ENV REACT_APP_API_URL "REACT_APP_API_URL_VAR"

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"]