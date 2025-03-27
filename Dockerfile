## Tutorial: https://medium.com/@abdullaharaheel/simplify-your-node-js-nest-js-deployment-step-by-step-guide-with-docker-and-google-cloud-97155c3ccfcc

#########################################################################
#
# BUILD FOR PRODUCTION
# 
#########################################################################

FROM node:23.10.0-alpine3.20 AS build

WORKDIR /app

# copy package.json and package-lock.json
COPY --chown=node:node package*.json ./

# install dependencies
RUN npm ci --ignore-scripts

# prisma client generation
COPY --chown=node:node ./prisma ./prisma
RUN npx prisma generate --schema=./prisma/schema.prisma

# copy all files from the current directory to the container
COPY --chown=node:node . .

# run build command which creates production bundle
RUN npm run build

# set node_env environment variable to production
ENV NODE_ENV=production

# removes existing node_modules directory and passing in --omit-dev flag
# to ensure that only the production dependencies are installed, ensuring node_modules
# is as optimized as possible and ignoring any scripts that may be present in the package.json
# RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

USER node



#########################################################################
#
# PRODUCTION
# 
#########################################################################

FROM node:23.10.0-alpine3.20 AS production

# copy bundled code from build stage to production image
COPY --chown=node:node --from=build /app/package*.json ./
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/prisma ./prisma


EXPOSE 8080

# start the server using the production build
CMD ["node", "dist/main.js"]