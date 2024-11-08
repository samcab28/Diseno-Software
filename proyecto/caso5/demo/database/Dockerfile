FROM postgres:15.5

# Install only postgresql-contrib for pgcrypto
RUN apt-get update && apt-get install -y \
    postgresql-contrib \
    && rm -rf /var/lib/apt/lists/*

# Copy SQL init scripts
COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Set correct permissions
RUN chmod +x /docker-entrypoint-initdb.d/*.sql