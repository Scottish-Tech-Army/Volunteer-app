# Git Flow

The team uses Git Flow to to develop the application and it's API. For more detail, have a look at Atlassian's [Git Flow documentation](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) or for a good synopsis [Daniel Kummer's cheatsheat](https://danielkummer.github.io/git-flow-cheatsheet/)

## Installing

### Mac

`brew install git-flow-avh`

### Linux

`apt-get install git-flow`

### Windows

Git for Windows has supported Git Flow from version 2.5.3

## Overview

Git Flow uses two permanent branches - main and develop:

- main is production
- develop is the working branch

There are some other, temporary, branches:

- hotfix for security patches
- feature to add functionality
- release where we decide which features to release

Most of the time you'll be creating feature branches, having them reviewed, and merging into develop.

## This is complicated why am I doing this?

Some features are not ready for production but are needed to develop other functions. For example login screens are needed to develop and test login logic but we don't want them in production yet.

Git Flow gives us the flexibility to continue developing as a team but picking and choosing which features hit production.

## Right I'm convinced so how do I do it?

Whatever you're doing the sequence is the same - start and push. Remember to replace JIRA-TICKET with the JIRA ticket you're working on, or a descriptive name if its not in Jira for whatever reason.

## Switching to Git Flow
***You must complete this step***
After cloning the repository or from your existing local repository enter `git flow init`. This asks a series of questions, accept all the default values, and configures your local `.gitconfig` file. This file is not uploaded to GitHub so only affects local installs.

You only need to complete this step the first time you clone a repository or when you first start using Git Flow in a project. You will have to do it for each computer you work on, unless you have some funky home directory syncing going on.

### Create a new feature

1. `git flow feature start SVA-999-my-jira-ticket` (where 999 is your ticket number) creates a new `feature` branch from `develop` and switches to it.
2. Once you're done then `git flow feature publish`.
3. Create a pull request as usual, which still requires two reviewers, what has changed is that we're now merging with `develop` and not `main`.
4. Once your PR is merged `git flow feature finish` will ensure that your feature is merged with your local `develop` branch and removes the `feature` branch.

### Bugfix

The process is the same, except the command changes from feature to hotfix `git flow bugfix start bug_number`

1. `git flow bugfix start bug_number` creates a new `feature` branch from `develop` and switches to it.
2. Once you're done then `git flow bugfix publish`.
3. Create a pull request as usual, which still requires two reviewers, this will merge to `main` and `develop`.
4. Once your PR is merged `git flow bugfix finish` will ensure that your feature is merged with `main` and `develop`, then removes the `bugfix` branch.

### Release

The process is the same, except the command changes from feature to hotfix `git flow bugfix start bug_number`

1. `git flow release start mvp-X` (where X is the MVP number) creates a new `feature` branch from `develop` and switches to it.
2. Once you're done then `git flow release publish`.
3. Create a pull request as usual, which still requires two reviewers, this will merge to `main`.
4. Once your PR is merged `git flow release finish` will ensure that your feature is merged with `main` then removes the `release` branch.

## Caveat

When merging remember to squash and merge, especially on main, to make it clear what feature was merged.

Ensure when creating or reviewing PR that the branches are as you expect:

- `feature` merge to `develop`
- `bugfix` merge to `main` and `develop`
- `release` merge to `main` and `develop`

If in doubt reach out to the team on the Slack #volunteer-app channel!

***This is new and you aren't expected to know it, we expect questions!***
