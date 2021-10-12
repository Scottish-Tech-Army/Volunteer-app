import * as fs from 'fs';

function writeToJsonFile( projectName ) {

    const insertFileTest = projectName;

    //open api_test.json file and parse JSON, then insert new data via 'insertFileTest'
    fs.readFile('../definitions/api_data.json', 'utf-8', (err, data) => {
        if(err) {
            throw err;
        }
        const projectName = JSON.parse(data);
        
        insertFileTest.forEach(element => {
            projectName.paths['/projects'].get.responses['200'].content['application/json'].issues.push(element);
        });

        fs.writeFile('../definitions/api_data.json', JSON.stringify(projectName), (err) => {
            if(err) {
                throw err;
            }
        });
        
    })
}

export { writeToJsonFile };