#!/bin/bash

# Abort script on first error
set -e

timeout=$1

# Docker command not include timeout
shift
docker_command=$@
echo $docker_command

container=$(docker run --rm -d $docker_command)

# If not timeout return 0, 0 is returned by docker wait container_id command
# else timeout will return 124,
# code=$(timeout "$timeout" docker wait "$container" || 1)
timeout 1s docker wait $container;
if [ $? -eq 124 ]; then 
  echo timeout;
else 
  echo not timeout;
fi
