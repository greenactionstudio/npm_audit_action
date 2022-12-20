const core = require('@actions/core');
const { spawnSync } = require('child_process');

async function run() {
    try {
        // Run npm audit with the requested severity
        const auditResult = spawnSync('npm', ['audit', `-audit-level=${core.getInput('severity')}`, '--json']);

        // If there are vulnerabilities with the requested severity or higher, exit code will be 1
        if (auditResult.status === 1) {
            core.setFailed(`Found vulnerability with "${core.getInput('severity')}" severity or higher`);
        }

        // Parse the output as JSON
        const auditJson = JSON.parse(auditResult.stdout);

        // Check for vulnerabilities with a certain string in the title
        const forbiddenString = core.getInput('title');
        if (forbiddenString !== '') {
            for (const vulnerability in auditJson.vulnerabilities) {
                if (auditJson.vulnerabilities[vulnerability].via[0].title.includes(forbiddenString)) {
                    core.setFailed(`Found vulnerability with "${forbiddenString}" in the title`);
                }
            }
        }
        console.log("Here is the full npm audit report:")
        console.log(`stdout: ${auditResult.stdout}`);
    }

    catch (error) {
        core.setFailed(error.message);
    }
}

run();

