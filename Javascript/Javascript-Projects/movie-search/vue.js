const API_KEY = '{}'
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
const IMG_URL = 'https://image.tmdb.org/t/p/w500'

const app = new Vue({
    el: '#main',
    data: {
        searchString: '',
        movies: [],
    },
    computed: {
        filteredMovies: function () {
            // 만약 searchString이 아무것도 없다면
            if (!this.searchString) {
                return this.movies
            }

            let searchString = this.searchString.trim().toLowerCase()
            return this.movies.filter(movie => {
                return movie.title.toLowerCase().includes(searchString)
            })
        }
    },
    // vue 인스턴스가 초기화되고 나서 실행하는 함수
    async created() {
        const response = await axios.get(URL)
        const movies = response.data.results

        this.movies = movies.map(movie => {
            return { title: movie.title, image: IMG_URL + movie.poster_path }
        })
  
    }
    // 1. 빈 무비 데이터를 가지고 있는 vue 인스턴스가 만들어진다.
    // 2. created 함수가 실행되면서 movies를 불러온다.
    // 3. 불러온 movies를 vue의 data안의 movies에 할당한다.
})
