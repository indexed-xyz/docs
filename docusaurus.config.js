// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Indexed.xyz Documentation',
  favicon: 'img/indexed.png',

  url: 'https://docs.indexed.xyz',
  baseUrl: '/',

  organizationName: 'indexed-xyz',
  projectName: 'docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/indexed-xyz/docs/tree/main/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/indexed-wordmark-dark.png',
      navbar: {
        logo: {
          alt: 'Indexed.xyz Logo',
          src: 'img/indexed-wordmark-dark.png',
          href: 'https://indexed.xyz',
        },
        items: [
          {
            href: 'https://github.com/indexed-xyz/docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Github Discussions',
                href: 'https://github.com/indexed-xyz/docs/discussions',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/goldskysupportbot',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/indexedxyz',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Goldsky, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
