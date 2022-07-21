#! /bin/bash -

# create config file if it does not exist
if [[ ! -e ./src/Config/index.ts ]]; then
    cp ./src/Config/index.example.ts ./src/Config/index.ts
fi