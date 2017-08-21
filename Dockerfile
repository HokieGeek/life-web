FROM nginx:alpine

# install console and node
RUN apk add --no-cache openssl nodejs bash curl

# Copy in the app
WORKDIR /usr/share/nginx
COPY . .
RUN rm -rf html && ln -s dist html

RUN npm install && npm run ng build --base-href=. --prod

RUN rm -rf /tmp/npm_inst /root/.npm
RUN apk del nodejs

EXPOSE 80
