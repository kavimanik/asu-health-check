const jwt = require('jsonwebtoken')
const axios = require('axios').default
require('dotenv/config')

const main = async (asuId) => {
  const token = jwt.sign(
    {
      sub: `${asuId}@asu.edu`,
      scope: ['https://app.m.asu.edu/healthcheck'],
      iss: 'serviceauth'
    },
    'number_one_in_innovation', // they don't even verify the jwt server-side lol
    { expiresIn: '7d' }
  )

  const instance = axios.create({
    baseURL: 'https://jrfhye0mkf.execute-api.us-west-2.amazonaws.com/prod',
    headers: {
      authorization: `Bearer ${token}`,
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36'
    },
    json: true
  })

  const reqBody = {
    type: 'post',
    payload: {
      additionalSymptoms: [],
      nbOfDaysExperiencingSymptom: 0,
      nbOfDaysNotExperiencingSymptom: 0,
      symptoms: ['NONE'],
      temperature: 0
    }
  }

  console.log('Submitting first question...')
  await instance.post('/questionnaireprod', reqBody)

  reqBody.payload.additionalSymptoms.push('NONE')

  console.log('Submitting second question...')
  await instance.post('/questionnaireprod', reqBody)

  console.log('Daily health check submitted!')
}

if (process.env.ASU_ID) {
  main(process.env.ASU_ID)
} else {
  console.log('You must supply an ASU_ID as an environment variable!')
}
