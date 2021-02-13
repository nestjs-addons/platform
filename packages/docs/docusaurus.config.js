module.exports = {
  title: 'Nestjs-Addons',
  tagline: '',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: '@nestjs-addons',
  projectName: '@nestjs-addons',
  themeConfig: {
    navbar: {
      title: 'NestJS Addons',
      logo: {
        alt: 'NestJS Addons Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: 'docs/docs',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        //{ to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/nestjs-addons/platform',
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
              label: 'Style Guide',
              to: 'docs/docs',
            },
          ],
        },
        {
          title: 'More',
          items: [
            /*{
              label: 'Blog',
              to: 'blog',
            },*/
            {
              label: 'GitHub',
              href: 'https://github.com/nestjs-addons/platform',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} NestJS Addons. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/nestjs-addons/platform/edit/master/packages/docs/docs/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/nestjs-addons/platform/edit/master/packages/docs/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
        [
      '@docusaurus/plugin-sitemap',
      {
        cacheTime: 600 * 1000, // 600 sec - cache purge period
        changefreq: 'weekly',
        priority: 0.5,
        trailingSlash: false,
      },
    ],
  ],
};
