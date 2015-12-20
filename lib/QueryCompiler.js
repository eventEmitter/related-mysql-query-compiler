(function() {
    'use strict';

    let path = require('path');
    let Class = require('ee-class');
    let type = require('ee-types');
    let log = require('ee-log');
    let QueryCompiler = require('related-query-compiler');




    

    module.exports = new Class({
        inherits: QueryCompiler





        /**
         * load a compiler from the filesystem, on demand loader
         * should be pretty secure since allowed filenames can only
         * contain [a-zA-Z].
         * 
         * @param {string} compilerName 
         *
         * @returns {promise}
         */
        , loadVendorCompiler: function(compilerName) {

            // try to get the local version
            let Compiler = this.loadFile(path.join(__dirname, 'compilers', compilerName[0].toUpperCase()+compilerName.substr(1)));

            // return the compiler if it exists
            return Promise.resolve(Compiler);
        }



        


        /**
         * escapes an id
         *
         * ported from: https://github.com/felixge/node-mysql/blob/30d39431bc9e7a0160ccc9b9f9242da563ed64e2/lib/protocol/SqlString.js#L3
         *
         * @param {string} input the string to escape
         *
         * @returns {string} the escaped id
         */
        , escapeId: function(input) {
            return '`' + input.replace(/`/g, '``').replace(/\./g, '`.`') + '`';
        }







        /**
         * escapes a literal
         *
         * ported from: https://github.com/brianc/node-postgres/blob/f50f5ce7e811f229e55101323a1f68cb883606ad/lib/client.js#L266
         *
         * @param {string} input the string to escape
         *
         * @returns {string} the escaped literal
         */
        , escape: function(input) {
            return `'${input.replace(/[\0\n\r\b\t\\\'\"\x1a]/g, function(s) {
                switch(s) {
                    case '\0': return '\\0';
                    case '\n': return '\\n';
                    case '\r': return '\\r';
                    case '\b': return '\\b';
                    case '\t': return '\\t';
                    case '\x1a': return '\\Z';
                    default: return '\\'+s;
                }
              })}'`;
        }
    });
})();
