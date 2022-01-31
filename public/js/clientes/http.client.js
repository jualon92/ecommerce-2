class Http {

    /* GET */
    async get(url, id) {
        try {
            return await fetch(url + (id || ''), { method: 'get' }).then(r => r.json())
        }
        catch (error) {
            console.error('ERROR GET', error)
        }
    }

    /* POST */
    async post(url, dato) {
        try {
            return await fetch(url, {
                method: 'post',
                body: JSON.stringify(dato),
                headers: { 'content-type': 'application/json' }

            }).then(r => r.json())
        }
        catch (error) {
            console.error('ERROR POST', error)
        }
    }

    /* PUT */
    async put(url, id, dato) {
        console.log(url + "/" +  id)
        try {

            return await fetch(url  +  id, {
                method: 'put',
                body: JSON.stringify(dato),
                headers: { 'content-type': 'application/json' }

            }).then(r => r.json())
        }
        catch (error) {
            console.error("s")
            console.error('ERROR PUT', error)
        }
    }

    /* DELETE */
    async del(url, id) { //se comunica con db
        try {
            console.log(url)
            console.log(id)
            console.log("prbando")
            let dir =   url +  id
            console.log("borrado en " + dir)
            return await fetch(dir, { method: 'delete' }).then(r => r.json())
        }
        catch (error) {

            console.error('ERROR DELETE 1q', error)
        }
    }   
}

const http = new Http()