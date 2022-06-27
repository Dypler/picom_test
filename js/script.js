const App = {
  data() {
    return {
      scroll: [],
      page: 1,
      limit: 10,
      more: true
    }
  },
  methods: {
    async getPosts() {
      try {
        const {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=${this.limit}`)
        this.scrolls.push(...data)
      } catch (e) {
        console.log(e.message)
      }
    },
    setLoadingObserver() {
      const loadingObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (this.page > 10) {
              this.more = false
              return
            }
            setTimeout(() => {
              this.getPosts()
              this.page++
            }, 1000)

          }
        })
      });
      loadingObserver.observe(document.querySelector('.scrolls__loading'))
    },
    setPostsObserver() {
      const postsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {

            entry.target.classList.add('scroll_active')
            observer.unobserve(entry.target);
          }
        })
      });
      document.querySelectorAll('.scrolls__post:not(.scroll_active)').forEach(post => {
        postsObserver.observe(post)
      })
    }
  },
  mounted() {
    this.setLoadingObserver()
  },
  updated() {
    this.setPostsObserver()
  }
}
Vue.createApp(App).mount('#app')