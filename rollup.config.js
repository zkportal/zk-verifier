const path = require('path');
const { name, version, author, repository } = require('./package.json');

const PATHS = {
  INPUT: path.resolve(__dirname, 'src', 'zk_verifier.js'),
  DIST: path.resolve(__dirname, 'dist')
}

const createBaseConfig = (callback) => {
  const baseConfig = {
    input: PATHS.INPUT,
  }

  return callback(baseConfig)
};

const beginYear = 2022;
const year = new Date().getFullYear();

let copyrightYear = '';
if (beginYear !== year) {
  copyrightYear = `${beginYear}-${year}`;
} else {
  copyrightYear = beginYear.toString();
}

const banner = `/*
* zk-verifier v${version} (${repository.url})
* Based on: ark-circom (https://github.com/gakonst/ark-circom)
* Copyright 2021 Georgios Konstantopoulos (https://github.com/gakonst)
* Copyright ${copyrightYear} ${author.name} (${author.url})
*/`

const CommonJSConfig = createBaseConfig(function(config) {
  return Object.assign({}, config, {
    output: {
      banner,
      name: name,
      sourcemap: false,
      format: 'cjs',
      file: path.resolve(PATHS.DIST, `${name}.common.js`)
    }
  })
});

const ESModulesConfig = createBaseConfig(function(config) {
  return Object.assign({}, config, {
    output: {
      banner,
      name: name,
      sourcemap: false,
      format: 'es',
      file: path.resolve(PATHS.DIST, `${name}.es.js`)
    }
  })
});

const UMDConfig = createBaseConfig(function(config) {
  return Object.assign({}, config, {
    output: {
      banner,
      name: name,
      sourcemap: false,
      exports: 'named',
      //globals: globals,
      format: 'umd',
      file: path.resolve(PATHS.DIST, `${name}.umd.js`)
    }
  })
});

module.exports = [
  CommonJSConfig,
  ESModulesConfig,
  UMDConfig,
];
