Error.stackTraceLimit = Infinity;

// Typescript emit helpers polyfill
require('angular');
require('angular-mocks/ngMock');
require('angular-translate');
require('angular-translate-loader-partial');

var testContext = require.context('../tests', true, /\.spec\.ts/);

/*
 * get all the files, for each file, call the context function
 * that will require the file and load it up here. Context will
 * loop and require those spec files here
 */
function requireAll( requireContext ) {
  return requireContext.keys().map( ( path ) => {
    try {
      return requireContext( path );
    } catch ( err ) {
      console.error( '[ERROR] WITH SPEC FILE: ', path );
      console.error( err );
    }
  } );
}

// requires and returns all modules that match
var modules = requireAll(testContext);
