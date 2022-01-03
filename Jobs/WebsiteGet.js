const axios = require('axios');
const dotenv = require('dotenv');


dotenv.config({ path: '../config/config.env' });



async function getWebsiteData(data) {
    try {
        for(let i = 0; i < data.length; i++) {
            axios.get(data[i].url)
            .then(async (res) => {
                
                let newStatus = 'Up';
                console.log(data[i].url, newStatus);
            
                if (data[i].status !== newStatus) {
                    console.log(data[i]);
                    const statusResponse = await axios.put(process.env.URL + '/api/websites' + '/' + data[i]._id);
                    console.log('worked');
                    if (statusResponse.success === false) console.log(statusResponse.error);
                }
            }).catch(async (err) => {
                if (err.response) {
                    let newStatus = 'Down';
                    console.log(data[i].url, newStatus);
                    try {
                        if (data[i].status !== newStatus) {
                            console.log(process.env.URL + '/api/websites' + '/update/' + data[i]._id);
                            const statusResponse = await axios.put(process.env.URL + '/api/websites' + '/update/' + data[i]._id);
                            
                            if (statusResponse.success === false) console.log(statusResponse.error);
                        }
                    } catch (error) {
                        //console.log('error');
                    }

                }
            });
           
            


        }
    } catch (error) {
        console.log("Going to error",  error.response.status);
    }
}


async function getURLS(url) {
    const URLs = []
    try {
        const response = await axios.get(url);        
        const data = response.data.data;
        data.forEach(element => {
            element.websites.forEach(val => {
                URLs.push(val);
                //console.log(val);
            })
            
        });
        //console.log("heelo", data);
        
        return URLs;
    } catch (error) {
        console.log(error);
    }

}

getURLS(process.env.URL + '/api/websites/all')
    .then(response => getWebsiteData(response))

    .catch((err) => console.log(err.data));
    // refresh
      