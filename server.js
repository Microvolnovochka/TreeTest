(async () => {
    const validator = require('html-validator')
    const { readFileSync } = require('fs')
    const options = {
    url: 'http://url-to-validate.com',
    format: 'text',
    data: readFileSync('main.html', 'utf8')
    }
    
    try {
      const result = await validator(options)
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  })()