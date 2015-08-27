Contributing
============

I'd love to get contributions from your part...in the end that's the value behind sharing, right :smile:.
However, for staying organized I'd like you to follow these simple guidelines:

- [Issues](#issues)
- [Commit Message Guidelines](#commit)
- [Coding](#coding)

## <a name="issues"></a> Issues

If you have a bug or enhancement request, please file an issue.

When submitting an issue, please include context from your test and
your application. If there's an error, please include the error text.

The best would be to submit a PR with a failing test :smiley:. Otherwise you can use my predefined Plunker to reproduce
the bug and link it in the issue: http://plnkr.co/edit/Smc89rX5UoCXYu6Qp2F0?p=preview.

## <a name="commit"></a> Commit Message Guidelines

These guidelines have been taken and adapted from the [official Angular guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines). By following the rules also mentioned in [conventional-changelog](https://www.npmjs.com/package/conventional-changelog). This leads to much more readable and clearer commit messages.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer than 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

### Scope
The scope could be anything specifying place of the commit change. For example
`olHelper`, `layer`, etc.

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

A detailed explanation can be found in this [document][commit-message-format].

## <a name="coding"></a> Coding

Clone this repo and setup your environment

```
$ npm install -g gulp
$ npm install
```

### Build

```
$ gulp build
```

### Execute tests

```
$ gulp test
```
