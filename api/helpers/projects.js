const apiDefinition = require('../definitions/api_definition.json');
const stringsHelper = require('../helpers/strings');

function combineProjectsAndResources(projects, resources) {
  return resources.map((resource) => {
    const project = projects.filter((project) => project.it_key === resource.it_key)[0];

    return {
      ...resource,
      ...project,
    };
  });
}

/* Takes a project resource object (project and resource combined),
   with the fields as they have come from AirTable,
   and formats it correctly for the API to return it to the user */
function formatProjectResourceFromAirTable(projectResource) {
  const projectResourceFormatted = {
    ...projectResource,
  };

  const projectResourceFieldDefinitions = apiDefinition.components.schemas.project.items.properties;

  for (const [fieldName, fieldProperties] of Object.entries(projectResourceFieldDefinitions)) {
    // AirTable doesn't include fields that it sees as empty (including its equivalent of boolean false) so we need to populate them
    if (!projectResource[fieldName]) {
      switch (fieldProperties.type) {
        case 'boolean':
          projectResourceFormatted[fieldName] = false;
          break;
        case 'string':
          projectResourceFormatted[fieldName] = '';
          break;
      }
    }

    // get ID from Vimeo URL
    if(projectResource[fieldName]=='video') {
      const vimeoID = '';
       projectResourceFormatted[fieldName] = (videoUrl) =>{
        if(!/^https?:\/\//i.test(url)){
          url = "http://" + url
        }
        let parsed = new URL(videoUrl)
        console.log(vimeoID);
        return vimeoID = parsed.pathname.split('/')[1]
      }
      
      // get MP4 from Vimeo api using the ID
          fetch(`https://player.vimeo.com/video/${vimeoID}/config`)
          .then(res => res.json())
          .then(res => this.setState({
           thumbnailUrl: res.video.thumbs['640'],
            videoUrl: res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
            video: res.video,
      }));
    }

    // Certain fields need to be formatted
    switch (fieldName) {
      case 'required':
        projectResourceFormatted[fieldName] =
          projectResource[fieldName] === 1 ? '1 person' : `${projectResource[fieldName]} people`;
        break;
      case 'skills':
        // For now, assumption based on available data is that skills are in separate paragraphs in a text field
        projectResourceFormatted[fieldName] = projectResource[fieldName]
          ? stringsHelper.splitByLineBreak(stringsHelper.removeBlankLines(projectResource[fieldName]))
          : [];
        break;       
    } 
  }

  return projectResourceFormatted;
}

module.exports = {
  combineProjectsAndResources,
  formatProjectResourceFromAirTable,
};
