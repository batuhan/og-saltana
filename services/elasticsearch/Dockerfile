FROM docker.elastic.co/elasticsearch/elasticsearch:7.3.2

# Set the plugin(s) version to prevent regression due to updates
# https://www.elastic.co/guide/en/elasticsearch/plugins/current/plugin-management-custom-url.html

# Moreover, prefer download the plugin(s) manually
# instead of relying on plugin http install
# with trusted certificate additional complexity
COPY analysis-icu-7.3.2.zip /tmp

RUN bin/elasticsearch-plugin install file:///tmp/analysis-icu-7.3.2.zip \
  && rm /tmp/analysis-icu-7.3.2.zip

CMD [ "docker-entrypoint.sh" ]
