
class API{
    static post_data(sub_url, data, fetch_callback){
        fetch(API.base_url +""+ sub_url+ "" +  "/get_prerequisites", {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: data
          })
            .then(res => res.json())
            .then((res) => {
              fetch_callback(res)
            })
    }
}

API.base_url  = "http://localhost:5000/api";

export default API
