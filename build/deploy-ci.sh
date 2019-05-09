#! /bin/sh
mkdir temp_web
git config --global user.name "savoygu-bot"
git config --global user.email "savoygu@163.com"

if [ "$ROT_TOKEN" = "" ]; then
  echo "Bye~"
  exit 0
fi

# release
if [ "$TRAVIS_TAG" ]; then
  # build theme-chalk
  cd temp_web
  git clone https://$ROT_TOKEN@github.com/savoygu/up-theme-chalk.git && cd up-theme-chalk
  rm -rf *
  cp -rf ../../packages/theme-chalk/** .
  git add -A .
  git commit -m "[build] $TRAVIS_TAG"
  git tag $TRAVIS_TAG
  git push origin master --tags
  cd ../..

  echo "DONE, Bye~"
  exit 0
fi

# push dev theme-chalk
cd temp_web
git clone -b $TRAVIS_BRANCH https://$ROT_TOKEN@github.com/savoygu/up-theme-chalk.git && cd up-theme-chalk
rm -rf *
cp -rf ../../packages/theme-chalk/** .
git add -A .
git commit -m "$TRAVIS_COMMIT_MSG"
git push origin $TRAVIS_BRANCH
cd ../..