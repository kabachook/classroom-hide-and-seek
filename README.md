# Classroom hide-and-seek

Hide your tests when using GitHub Classroom


## Why?

Because teachers use Github Classroom and CI to check/grade assignments. Sometimes tests' code may be beneficial for students, e.g. assignment is to implement some algorithm or business logic. Thus, students may copy the implementation from tests to pass CI checks.

Currently there is no way to hide tests.

## Solution

Let tests be in private Github repo with access by ssh key. CI pulls tests using provided key.

### Travis-CI

There is no way to set env var for all repos in organization. Thus, we need to write a bot :(

## Implementation

1. Github sends event when new repo is created
2. the app wait for Travis-CI to create an entry for repo
3. the app pushes ssh key to repo's env var
4. the app asks Travis-CI to rebuild

## P.S.

Of course it doesn't fully protect your tests. Evil student may send some code that will print them or send them to server. Nevertheless, it is harder than copying code from repo.