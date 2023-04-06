# final stage/image
FROM node:latest
COPY app app
WORKDIR /app
RUN npm i
CMD ["node", "index.js"]
# CMD tail -f /dev/null
