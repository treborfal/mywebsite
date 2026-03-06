(function () {
  function isExternalUrl(url) {
    return /^https?:\/\//i.test(url);
  }

  function createAnchor(link, text, title, openInNewTab) {
    var anchor = document.createElement('a');
    anchor.href = link;
    anchor.textContent = text;

    if (title) {
      anchor.title = title;
    }

    if (openInNewTab) {
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
    }

    return anchor;
  }

  function renderHero(siteContent) {
    var heroLead = document.getElementById('hero-lead');
    var heroFact = document.getElementById('hero-fact');
    var roleHeading = document.getElementById('current-role');

    if (heroLead && siteContent.hero) {
      var heroName = siteContent.hero.name || '';
      var tagline = Array.isArray(siteContent.hero.tagline) ? siteContent.hero.tagline : [];

      heroLead.innerHTML = '';
      heroLead.appendChild(document.createTextNode(heroName + '* — '));
      heroLead.appendChild(document.createElement('br'));

      tagline.forEach(function (line) {
        heroLead.appendChild(document.createTextNode(line));
        heroLead.appendChild(document.createElement('br'));
      });
    }

    if (heroFact && siteContent.hero && siteContent.hero.funFact) {
      var fact = siteContent.hero.funFact;

      heroFact.innerHTML = '';
      heroFact.appendChild(document.createTextNode((fact.prefix || '') + ' '));

      var crossedOut = document.createElement('span');
      crossedOut.className = 'linethrough';
      crossedOut.textContent = fact.crossedOut || '';
      heroFact.appendChild(crossedOut);

      heroFact.appendChild(document.createTextNode(' ' + (fact.value || '') + ' ' + (fact.suffix || '')));
    }

    if (roleHeading && siteContent.currentRole && siteContent.currentRole.company) {
      var currentRole = siteContent.currentRole;
      var company = currentRole.company;

      roleHeading.innerHTML = '';
      roleHeading.appendChild(document.createTextNode((currentRole.prefix || '') + ' '));
      roleHeading.appendChild(
        createAnchor(company.url || '#', company.name || '', company.title || '', true)
      );
      roleHeading.appendChild(document.createTextNode('.'));
    }
  }

  function renderProjects(projectContent) {
    var projectsContainer = document.getElementById('side-projects-list');

    if (!projectsContainer || !projectContent || !Array.isArray(projectContent.sideProjects)) {
      return;
    }

    projectsContainer.innerHTML = '';

    projectContent.sideProjects.forEach(function (project) {
      var projectNode = document.createElement('div');
      projectNode.className = 'project';

      var heading = document.createElement('h4');
      var primaryLink = createAnchor(
        project.url || '#',
        project.name || '',
        project.title || '',
        isExternalUrl(project.url || '')
      );

      heading.appendChild(primaryLink);
      if (project.description) {
        heading.appendChild(document.createTextNode(', ' + project.description));
      }
      projectNode.appendChild(heading);

      if (Array.isArray(project.links)) {
        project.links.forEach(function (link) {
          var cta = createAnchor(
            link.url || '#',
            (link.label || 'Link') + ' →',
            link.title || '',
            isExternalUrl(link.url || '')
          );
          cta.className = 'button rounded';
          projectNode.appendChild(cta);
        });
      }

      projectsContainer.appendChild(projectNode);
    });
  }

  function getJson(url) {
    return fetch(url).then(function (response) {
      if (!response.ok) {
        throw new Error('Could not load ' + url);
      }

      return response.json();
    });
  }

  function init() {
    Promise.all([
      getJson('./data/site-content.json'),
      getJson('./data/projects.json')
    ])
      .then(function (result) {
        renderHero(result[0]);
        renderProjects(result[1]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
