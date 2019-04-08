var types = require('babel-types');
var isValidPath = require('is-valid-path');
var camel = require('lodash.camelcase');
var findKey = require('lodash.findkey');
var kebab = require('lodash.kebabcase');
var snake = require('lodash.snakecase');
var pathLib = require('path');

function findOptionFromSource(source, state) {
    var opts = state.opts;
    if (opts[source]) return source;

    return

    var opt = findKey(opts, function (o, _opt) {
        return !isValidPath(_opt) && new RegExp(_opt).test(source);
    });
    if (opt) return opt;

    var isRelativePath = source.match(/^\.{0,2}\//);
    // This block handles relative paths, such as ./components, ../../components, etc.
    if (isRelativePath) {
        var _source = pathLib.resolve(pathLib.join(
            source[0] === '/' ? '' : pathLib.dirname(state.file.opts.filename),
            source
        ));

        if (opts[_source]) {
            return _source;
        }
    }
}

function getMatchesFromSource(opt, source) {
    var regex = new RegExp(opt, 'g');
    var matches = [];
    var m;
    while ((m = regex.exec(source)) !== null) {
        if (m.index === regex.lastIndex) regex.lastIndex++;
        m.forEach(function(match) {
            matches.push(match);
        });
    }
    return matches;
}

function barf(msg) {
    throw new Error('babel-plugin-transform-imports: ' + msg);
}

function transform(transformOption, importName, matches) {
    var isFunction = typeof transformOption === 'function';
    if (/\.js$/i.test(transformOption) || isFunction) {
        var transformFn;

        try {
            transformFn = isFunction ? transformOption : require(transformOption);
        } catch (error) {
            barf('failed to require transform file ' + transformOption);
        }

        if (typeof transformFn !== 'function') {
            barf('expected transform function to be exported from ' + transformOption);
        }

        return transformFn(importName, matches);
    }

    return transformOption.replace(/\$\{\s?([\w\d]*)\s?\}/ig, function(str, g1) {
        if (g1 === 'member') return importName;
        return matches[g1];
    });
}

module.exports = function() {
    return {
        visitor: {
            ImportDeclaration: function (path, state) {
                // https://github.com/babel/babel/tree/master/packages/babel-types#timportdeclarationspecifiers-source

                // path.node has properties 'source' and 'specifiers' attached.
                // path.node.source is the library/module name, aka 'react-bootstrap'.
                // path.node.specifiers is an array of ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier

                var source = path.node.source.value;

                var opt = findOptionFromSource(source, state);
                var isRegexp = opt && !isValidPath(opt);
                var opts = state.opts[opt];
                var hasOpts = !!opts;

                if (hasOpts) {
                    if (!opts.transform) {
                        barf('transform option is required for module ' + source);
                    }

                    var transforms = [];

                    var fullImports = path.node.specifiers.filter(function(specifier) { return specifier.type !== 'ImportSpecifier' });
                    var memberImports = path.node.specifiers.filter(function(specifier) { return specifier.type === 'ImportSpecifier' });

                    if (fullImports.length > 0) {
                        // Examples of "full" imports:
                        //      import * as name from 'module'; (ImportNamespaceSpecifier)
                        //      import name from 'module'; (ImportDefaultSpecifier)

                        if (opts.preventFullImport) {
                            barf('import of entire module ' + source + ' not allowed due to preventFullImport setting');
                        }

                        if (memberImports.length > 0) {
                            // Swap out the import with one that doesn't include member imports.  Member imports should each get their own import line
                            // transform this:
                            //      import Bootstrap, { Grid } from 'react-bootstrap';
                            // into this:
                            //      import Bootstrap from 'react-bootstrap';
                            transforms.push(types.importDeclaration(fullImports, types.stringLiteral(source)));
                        }
                    }

                    var matches = isRegexp ? getMatchesFromSource(opt, source) : [];

                    memberImports.forEach(function(memberImport) {
                        // Examples of member imports:
                        //      import { member } from 'module'; (ImportSpecifier)
                        //      import { member as alias } from 'module' (ImportSpecifier)

                        // transform this:
                        //      import { Grid as gird } from 'react-bootstrap';
                        // into this:
                        //      import gird from 'react-bootstrap/lib/Grid';
                        // or this, if skipDefaultConversion = true:
                        //      import { Grid as gird } from 'react-bootstrap/lib/Grid';

                        var importName = memberImport.imported.name;
                        if (opts.camelCase) importName = camel(importName);
                        if (opts.kebabCase) importName = kebab(importName);
                        if (opts.snakeCase) importName = snake(importName);

                        var replace = transform(opts.transform, importName, matches);

                        var newImportSpecifier = (opts.skipDefaultConversion)
                            ? memberImport
                            : types.importDefaultSpecifier(types.identifier(memberImport.local.name));
                        transforms.push(types.importDeclaration(
                            [newImportSpecifier],
                            types.stringLiteral(replace + ' // COMMENT')
                        ));
                    });

                    if (transforms.length > 0) {
                        path.replaceWithMultiple(transforms);
                    }
                }
            }
        }
    }
}
