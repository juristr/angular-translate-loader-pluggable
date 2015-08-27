angular-translate Pluggable Loader
---

[![Build Status](https://travis-ci.org/juristr/angular-translate-loader-pluggable.svg?branch=master)](https://travis-ci.org/juristr/angular-translate-loader-pluggable) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](https://badge.fury.io/js/angular-translate-loader-pluggable.svg)](http://badge.fury.io/js/angular-translate-loader-pluggable)

Pluggable Loader is a custom loader for [angular-translate](https://github.com/angular-translate/angular-translate). It aims to facilitate the modularization of the applications s.t. each module can contribute their own translations and possibly be independent in the kind of angular-translate loader it uses.

- where it all started: https://github.com/angular-translate/angular-translate/issues/1125

## Installation

Available as [npm package](https://www.npmjs.com/package/angular-translate-loader-pluggable)

```
$ npm install angular-translate-loader-pluggable --save
```

## Docs & Demo

**Plunkr demo:** http://plnkr.co/edit/Smc89rX5UoCXYu6Qp2F0?p=preview

Configure your app to use the **pluggable loader**:

```javascript
angular.module('demoapp', [
    'pascalprecht.translate',
    'angular-translate-loader-pluggable'
  ])
  .config(function translationConfig($translateProvider, translatePluggableLoaderProvider) {
    $translateProvider.useLoader('translatePluggableLoader');
  })
```

Then, in your angular modules where you want to contribute new translations, use the `translatePluggableLoaderProvider` instead of the `$translateProvider`.

```javascript
angular.module('staticTranslationsModule', ['angular-translate-loader-pluggable'])
  .config(function(translatePluggableLoaderProvider) {
    translatePluggableLoaderProvider
      .translations('de', {
        "anotherMessage": "Anderes Message!"
      })
      .translations('en', {
        "anotherMessage": "Some Message!"
      });
  });
```

You can also use other loaders, such as the partial loader:

```javascript
angular
  .module('partialModule', ['angular-translate-loader-pluggable'])
  .config(function(translatePluggableLoaderProvider, $translatePartialLoaderProvider){
    // this module uses the $translatePartialLoader
    translatePluggableLoaderProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '{part}-locale-{lang}.json'
    });

    $translatePartialLoaderProvider.addPart('anothermodule');
  });
```

**Note** that I'm not registering the `$translatePartialLoader` on the `$translateProvider` but instead on the `translatePluggableLoderProvider` so that it can handle it.

---

**Your loader doesn't work? [Let me know about it!](https://github.com/juristr/angular-translate-loader-pluggable/issues)**

## Contribute

Of course! If you have improvements, suggestions, let me know about them and either file some issues to discuss something or even better, submit a PR. Please check out our [contribution guidelines](CONTRIBUTING.md)!
