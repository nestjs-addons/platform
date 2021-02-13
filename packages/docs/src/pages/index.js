import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const maintainers = [
  {
    name: 'Wes Grimes',
    githubHandle: 'wesgrimes',
    url: 'https://wesleygrimes.com',
    imgUrl: 'https://avatars0.githubusercontent.com/u/324308?v=4',
    tasks: [
      {
        icon: '🚇',
        description: 'Infrastructure (Hosting, Build-Tools, etc)'
      },
      {
        icon: '⚠️',
        description: 'Tests'
      },
      {
        icon: '💻',
        description: 'Code'
      }
    ]
  },
  {
    name: 'Jay Bell',
    githubHandle: 'yharaskrik',
    url: 'https://github.com/yharaskrik',
    imgUrl: 'https://avatars3.githubusercontent.com/u/9469090?s=460&u=cdb912283b06f43b36da0137e61d66a48f9f7e85&v=4',
    tasks: [
      {
        icon: '⚠️',
        description: 'Tests'
      },
      {
        icon: '💻',
        description: 'Code'
      }
    ]
  },
  {
    name: 'Dominik Pieper',
    githubHandle: 'DominikPieper',
    url: 'https://github.com/DominikPieper',
    imgUrl: 'https://avatars3.githubusercontent.com/u/77470?s=460&u=dcb757adc603e0d4caebb02182be9674299e0de0&v=4',
    tasks: [
      {
        icon: '🚇',
        description: 'Infrastructure (Hosting, Build-Tools, etc)'
      },
      {
        icon: '⚠️',
        description: 'Tests'
      },
      {
        icon: '💻',
        description: 'Code'
      }
    ]
  }
];

const contributors = [
  {
    name: 'Chris Whited',
    githubHandle: 'cmwhited',
    url: 'https://github.com/cmwhited',
    imgUrl: 'https://avatars0.githubusercontent.com/u/18075124?v=4',
    tasks: [
      {
        icon: '🚇',
        description: 'Infrastructure (Hosting, Build-Tools, etc)'
      },
      {
        icon: '⚠️',
        description: 'Tests'
      },
      {
        icon: '💻',
        description: 'Code'
      }
    ]
  },
  {
    name: 'Wes Copeland',
    githubHandle: 'wescopeland',
    url: 'https://github.com/wescopeland',
    imgUrl: 'https://avatars0.githubusercontent.com/u/3984985?v=4',
    tasks: [
      {
        icon: '⚠️',
        description: 'Tests'
      },
      {
        icon: '💻',
        description: 'Code'
      }
    ]
  },
  {
    name: 'Jordan',
    githubHandle: 'jordanpowell88',
    url: 'http://hirejordanpowell.com',
    imgUrl: 'https://avatars0.githubusercontent.com/u/3605268?v=4',
    tasks: [
      {
        icon: '⚠️',
        description: 'Tests'
      },
      {
        icon: '💻',
        description: 'Code'
      }
    ]
  },
  {
    name: 'Santosh Yadav',
    githubHandle: 'santoshyadav198613',
    url: 'https://www.santoshyadav.dev',
    imgUrl: 'https://avatars3.githubusercontent.com/u/11923975?v=4',
    tasks: [
      {
        icon: '⚠️',
        description: 'Tests'
      },
      {
        icon: '💻',
        description: 'Code'
      }
    ]
  },
  {
    name: 'Itay Oded',
    githubHandle: 'itayod',
    url: 'https://github.com/itayod',
    imgUrl: 'https://avatars2.githubusercontent.com/u/6719615?v=4',
    tasks: [
      {
        icon: '⚠️',
        description: 'Tests'
      },
      {
        icon: '💻',
        description: 'Code'
      }
    ]
  }
];

const features = [
  {
    title: <>Easy to Use</>,
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: <>Focus on What Matters</>,
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: <>Powered by React</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function DeveloperCard({ name, imgUrl, tasks, githubHandle, url }) {
  return (
<div className={clsx('col col--2')}>
  <div className="card-demo">
    <div className="card">
      <div className="card__header text--center">
        {imgUrl && (
          <img src={imgUrl} alt={name} />
        )}
        <h4><a href={url}>{name}</a></h4>
      </div>
      <div className="card__body text--center">
        {tasks.map((props, idx) => (
          <a key={idx} href={'https://github.com/nestjs-addons/platform/commits?author=' + githubHandle} title={props.description}>{props.icon}</a>
        ))}
      </div>
    </div>
  </div>
</div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={siteConfig.title}
      description="Addons for NestJs"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/docs')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="container">
          <h2>Maintainers</h2>
        </div>
        {maintainers && maintainers.length > 0 && (
          <section className={styles.contributors}>
            <div className="container">
              <div className="row">
                {maintainers.map((props, idx) => (
                  <DeveloperCard key={idx} {...props}></DeveloperCard>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="container">
          <h2>Contributors</h2>
          <p>Thanks goes to these wonderful people (<a href="https://allcontributors.org/docs/en/emoji-key">emoji key</a>):</p>
        </div>
        {contributors && contributors.length > 0 && (
          <section className={styles.contributors}>
            <div className="container">
              <div className="row">
                {contributors.map((props, idx) => (
                  <DeveloperCard key={idx} {...props}></DeveloperCard>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
    </Layout>
  );
}

export default Home;
