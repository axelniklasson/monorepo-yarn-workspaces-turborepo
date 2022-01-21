# Monorepo with yarn workspaces and Turborepo
This repo is a boilerplate for how a JS monorepo can be setup using [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) and [Turborepo](https://turborepo.org/) along with GitHub actions for CI.

## Turbo pipeline
The Turbo pipeline has been setup to run the following
```
lint -> test -> build
```
in sequenece, so for every successful build both linting and tests will also have been run.

## CI workflow
### Pushes
Whenever a push is made to a branch, the following happens;
- If the branch *does not* have a parent (i.e. the `main` branch), `yarn turbo run build` is run which triggers a build in every app/package in the monorepo
- If the branch *does* have a parent, `yarn turbo run build --since=origin/<parent_branch>` is run which triggers a build in every app/package that has been changed since branched out from the parent branch

### Pull requests
Whenever a pull request is opened, the following happens:
- `yarn turbo run build --since=origin/<base_branch>` is run which triggers a build in every app/package in the monorepo that would be changed if the PR would be merged into the base branch
