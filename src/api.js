import axios from "axios";

export function api() {
    return axios.create({
        baseURL: "https://react-yazi-yorum.herokuapp.com"
    })
}

// api().get('/posts')
// axios.get('ttps://react-yazi-yorum.herokuapp.com/posts')