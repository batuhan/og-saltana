FROM timescale/timescaledb:latest-pg12

# Certificates generated via `test/ssl/generate-cert.sh` script

COPY test/ssl/server.key /var/lib/postgresql/server.key
COPY test/ssl/server.crt /var/lib/postgresql/server.crt
RUN chown postgres /var/lib/postgresql/server.key && chmod 600 /var/lib/postgresql/server.key
