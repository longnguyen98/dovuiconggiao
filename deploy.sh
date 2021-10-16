ng build
rm -r dist/firebase_deploy/public/*
cd dist/dovuiconggiao
cp -R * ../firebase_deploy/public
cd ../firebase_deploy
firebase deploy -p ./public
date +"%T"
