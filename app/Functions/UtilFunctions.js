const https = require('https');

class Util {
    async httpGet (url) {
      return await new Promise((resolve, reject) => {
       https.get(url, res => {
          res.setEncoding('utf8');
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => resolve(body));
        }).on('error', reject);
      });
    };
    
    deepCopy(original) {
      let copy = JSON.parse(JSON.stringify(original))
      return Object.assign({}, copy);
    }

    isJson (str) {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
    }

   isEmpty(obj) {
      for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
              return false;
      }
  
      return true;
  }

    removeObjectProperties (obj, props) {

      for(var i = 0; i < props.length; i++) {
          if(obj.hasOwnProperty(props[i])) {
              delete obj[props[i]];
          }
      }

      return obj;
  
  };
}

module.exports = Util;