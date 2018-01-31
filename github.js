const https = require('https');

function getRepos(username, done) {
    if (!username) return done(new Error('Need user name'));

    const options = {
        hostname: 'api.github.com',
        path: `/users/${username}/repos`,
        headers: {'User-Agent': 'Niko42na'}
    };

    const req = https.get(options, res => {
        res.setEncoding('utf-8');
        if(res.statusCode === 200 ){
            let body = '';
            res.on('data', data => body+=data);
            res.on('end', () => {
                try{
                    const result = JSON.parse(body);
                    done(null, result);
                } catch (error) {
                    done (new Error (`Could not operate data (${error.message})`));
                }
            });
        } else {
            done (new Error (`Could not get data from server (${res.statusCode} ${res.statusMessage})`));
        }
    });

    req.on ('error', error => done(new Error(`Could not send request (${error.message})`)));
}

module.exports ={
    getRepos
};