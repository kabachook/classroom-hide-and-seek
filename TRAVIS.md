# Travis CI setup

`.travis.yml`:

```yaml
before_install:
  - echo $key | base64 -d > tests.key
  - ssh-add tests.key
  - ssh clone --depth=1 git@github.com:user/repo.git tests
  - cp -r ./tests/src/* ./src/
```