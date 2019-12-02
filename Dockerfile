# Use Node.js 10.16.3 LTS
FROM node:10.16.3

# Environment Variables
ENV PORT 3000

# Copy Source Code
COPY . /app

# Change Working Directory
WORKDIR /app

# Install Node Dependencies
RUN npm install

# Expose Api Port
EXPOSE ${PORT}

# Launch Application
CMD ["node", "index.js"]