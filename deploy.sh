ng build
cd dist/dovuiconggiao
cp -R * ../firebase_deploy
cd ../firebase_deploy
firebase deploy -p ./
