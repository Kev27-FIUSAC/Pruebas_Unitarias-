<template>
  <div class="container">
    <CreatePost
      class="create"
      :User="User"
      :Tags="Tags"
      @posted="newPost($event)"
    />
    <FilterList class="filter" :Tags="Tags" @filter="findPosts($event)" />
    <div class="post-list" v-for="post of FilteredPosts" :key="post.idPost">
      <SinglePost :Post="post" />
    </div>
  </div>
</template>

<script>
import SinglePost from "./SinglePost.vue";
import CreatePost from "./CreatePost.vue";
import FilterList from "./FilterList.vue";
export default {
  name: "Posts",
  components: {
    SinglePost,
    CreatePost,
    FilterList,
  },
  data() {
    return {
      Posts: [],
      FilteredPosts: [],
      Tags: [],
      User: {},
    };
  },
  beforeMount() {
    let us = localStorage.getItem("user-info");
    this.User = JSON.parse(us);
    this.getTags();
    this.getPosts();
    this.FilteredPosts = this.Posts;
  },
  methods: {
    getTags() {
      this.Tags = [];
      this.Tags.push({
        idTag: 0,
        Etiqueta: "Todos",
      });
      
    },
    async findPosts(nombreEtiqueta) {
      this.FilteredPosts = [];
      if (nombreEtiqueta.toLowerCase() === "todos") {
        this.FilteredPosts = this.Posts;
      } else {
        for await (let p of this.Posts) {
          for (let x = 0; x < p.tags.length; x++) {
            let tag = p.tags[x];
            if (tag.etiqueta.toLowerCase() === nombreEtiqueta.toLowerCase()) {
              this.FilteredPosts.push(p);
              break;
            }
          }
        }
      }
    },
    newPost(post) {
      console.log("NEW POST");
      console.log(post);
      this.Posts.unshift(post);
      //this.getTags();
      //this.getPosts();
    },
    getPosts() {
      this.Posts = [];
      if(this.axios === undefined){
        return
      }
      this.axios
        .post(`api/posts`, { idUsuario: this.User.idUsuario })
        .then((response) => {
          console.log("x: ", response)
          for (let i = 0; i < response.data.length; i++) {
            console.log("POST: ", response.data[i]);
            let imgx = "";
            if (response.data[i].publicacion.url_imagen.length > 0) {
              imgx += response.data[i].publicacion.url_imagen + "?sig=" + i;
            }
            let sp = {
              idPost: response.data[i].publicacion.idPublicacion,
              owner: response.data[i].publicacion.username,
              image: imgx,
              text: response.data[i].publicacion.texto,
              fecha: response.data[i].publicacion.fecha,
              tags: response.data[i].etiquetas,
            };
            this.Posts.push(sp);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #18191a;
}
</style>