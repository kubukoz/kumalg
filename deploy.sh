#!/bin/bash
set -ev

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]
then
### PROD
	firebase deploy --token ${FIREBASE_TOKEN} --project project-1086201511764046951
else
### PREVIEW
	firebase deploy --token ${FIREBASE_TOKEN} --project kumalg-pulls
fi