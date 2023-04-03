/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: 'Indexed.xyz Documentation',
  favicon: 'img/indexed-logo.svg',

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
          sidebarPath: require.resolve('./sidebars.cjs'),
          editUrl: 'https://github.com/indexed-xyz/docs/tree/main/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/',
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        // ```
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/twitter-card.png',
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
        theme: require('prism-react-renderer/themes/github'),
        darkTheme: require('prism-react-renderer/themes/dracula'),
      },
    }),
};
