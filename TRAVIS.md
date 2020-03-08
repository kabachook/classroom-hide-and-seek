# Travis CI setup

`.travis.yml`:

```yaml
before_install:
  - echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
  - echo $key | base64 -d > tests.key
  - chmod 600 tests.key
  - eval $(ssh-agent)
  - ssh-add tests.key
  - ssh clone --depth=1 git@github.com:user/repo.git tests
  - cp -r ./tests/src/* ./src/
  - rm -r tests tests.key
```