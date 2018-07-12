const modules = {
  'Jenkins CI': {
    key: 'jenkins',
    logo: 'jenkins.png'
  },
  'Bitbucket SCM': {
    key: 'bitbucket',
    logo: 'bitbucket.png'
  },
  'JIRA ALM': {
    key: 'jira',
    logo: 'jira.png'
  },
  'Confluence Wiki': {
    key: 'confluence',
    logo: 'confluence.png'
  },
  'Artifactory Repository': {
    key: 'artifactory',
    logo: 'artifactory.png'
  },
  'Sonarqube Analysis': {
    key: 'sonarqube',
    logo: 'sonarqube.png'
  },
  'Chat Messenger': {
    key: 'chat',
    logo: 'slack.png'
  },
  'Dev Environment': {
    key: 'devenv',
    logo: 'docker.png'
  }
};

function buildLink(key, site) {
  switch (key) {
    case 'jenkins':
      return site.jenkins_base + '/job/demo-pipelines/job/' + site.project_name;
    case 'bitbucket':
      return site.bitbucket_base + '/projects/' + site.project_key;
    case 'jira':
      return site.jira_base + '/projects/' + site.project_key;
    case 'confluence':
      return site.confluence_base + '/display/' + site.project_key;
    case 'artifactory':
      return site.artifactory_base + '/';
    case 'sonarqube':
      return site.sonarqube_base + '/';
    case 'chat':
      return site.chat_base + '/messages/' + site.chat_room;
    case 'devenv':
      return 'http://dev.' + site.app_name + '.' + site.tools_domain;
    default:
      return '';
  }
}

export { modules, buildLink };
