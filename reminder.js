const axios = require('axios');
const dateFns = require('date-fns');

const { DATE_YEAR, DATE_MONTH, DATE_DAY, SLACK_WEBHOOK_URL } = process.env;

let humanizeFutureToNow = fDate => {
    let result = [], now = new Date()
    let parts = ['year', 'month', 'day', 'hour', 'minute']

    parts.forEach((p, i) => {
        let uP = p.charAt(0).toUpperCase() + p.slice(1)
        let t = dateFns[`differenceIn${uP}s`](fDate, now);
        if (t) {
            result.push(`${i === parts.length - 1 ? 'and ' : ''}${t} ${uP}${t === 1 ? '' : 's'}`);
            if (i < parts.length)
                fDate = dateFns[`sub${uP}s`](fDate, t);
        }
    })
    return result.join(' ');
}

axios.post(SLACK_WEBHOOK_URL, { text: humanizeFutureToNow(new Date(parseInt(DATE_YEAR), parseInt(DATE_MONTH), parseInt(DATE_DAY), 0, 0, 0, 0)) })
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.error(error);
});
