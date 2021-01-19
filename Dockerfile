# syntax=docker/dockerfile:experimental
FROM node:10-alpine

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

# install dependencies
COPY package.json yarn.lock /usr/src/app/
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn/,id=yarn-cache yarn install --frozen-lockfile && ls node_modules > /dev/null

# copy source files
COPY src/ /usr/src/app/src/
COPY .babelrc /usr/src/app/

# test the app
COPY __tests__ /usr/src/app/__tests__/
COPY jest/ /usr/src/app/jest/
COPY jest.config.js /usr/src/app/
RUN --mount=type=cache,target=/tmp/jest-cache/,id=jest-cache npm run test

# build the app
COPY public/ /usr/src/app/public/
COPY webpack/ /usr/src/app/webpack/
COPY tsconfig.json /usr/src/app/
COPY tslint.json /usr/src/app/
COPY postcss.config.js /usr/src/app/
RUN --mount=type=cache,target=node_modules/.cache/,id=node_modules-cache-bank-portal-front npm run build

# build storybook
COPY .storybook/ /usr/src/app/.storybook/
ARG BUILD_STORYBOOK
RUN --mount=type=cache,target=node_modules/.cache/,id=node_modules-cache-bank-portal-front if [ "$BUILD_STORYBOOK" = "true" ]; then npm run build-storybook && mv storybook-static build/storybook/; fi

# app container
FROM nginx:1.16-alpine

COPY --from=0 /usr/src/app/build/ /usr/share/nginx/html/
COPY --from=0 /usr/src/app/public/config.json /usr/share/nginx/html/

COPY docker/generate_config.sh /
RUN chmod +x /generate_config.sh

RUN rm /etc/nginx/nginx.conf && rm -rf /etc/nginx/conf.d
COPY docker/nginx.conf /etc/nginx/

CMD ["sh", "-c", "/generate_config.sh /usr/share/nginx/html/config.json && nginx -g 'daemon off;'"]
