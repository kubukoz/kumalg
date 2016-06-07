#!/bin/bash
set -ev

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]
then
	firebase deploy --token ${FIREBASE_TOKEN}
else
	firebase deploy --token ${FIREBASE_TOKEN_PULL}
fi