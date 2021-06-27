// {
//   "presets": [
//     [
//       "next/babel",
//       {
//         "preset-react": {
//           "runtime": "automatic",

//           "importSource": "@emotion/react"
//         }
//       }
//     ]
//   ],
//   "plugins": ["@emotion/babel-plugin"]
// }

// eslint-disable-next-line func-names
module.exports = function (api) {
  const isServer = api.caller((caller) => caller?.isServer);
  const isCallerDevelopment = api.caller((caller) => caller?.isDev);

  const presets = [
    [
      'next/babel',
      {
        'preset-react': {
          importSource:
            !isServer && isCallerDevelopment
              ? '@welldone-software/why-did-you-render'
              : '@emotion/react',
        },
      },
    ],
  ];

  const plugins = ['@emotion/babel-plugin'];
  return { presets, plugins };
};
