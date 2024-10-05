const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Accept-Encoding': 'gzip',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      location: 'Orlando',
      fields: ['temperature', 'temperatureApparent'],
      units: 'metric',
      timesteps: ['current'],
      startTime: 'now',
      endTime: 'nowPlus1h'
    })
  };
  
  fetch('https://api.tomorrow.io/v4/timelines?apikey=Aodbxm7B89imRUsUYJmKvTX9PQKW2O1Z', options)
    .then(response => response.json())
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(err => console.error(err));