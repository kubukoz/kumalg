#!/bin/bash
set -ev

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]
then
	firebase deploy --token ${FIREBASE_TOKEN} --project kumalg
else
	firebase deploy --token ${FIREBASE_TOKEN} --project kumalg-pulls
fi