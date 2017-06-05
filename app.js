// (function () {

  var container = document.getElementById('container')

  let state = {
		guardURL : "https://crossorigin.me/https://content.guardianapis.com/search?api-key=2b9272f0-a832-4fe2-9fca-c004a4fa70a3",
	 	articles:[],
    complete:[],
	 	articleReset:function(){
	 		state.articles =[],
      state.complete =[]
	 	}
	}


	function getGuard(){
	  	fetch(state.guardURL).then((response)=>{
	    return response.json()
		}).then((callback)=>{
	  		state.articleReset()
	  		callback.response.results.forEach((guard,index)=>{
	  			state.articles.push(guard.webTitle)
	  		})
			}).then(()=>{
        spud()
      })
		}


    function giphy(headline){
      fetch("https://crossorigin.me/https://api.giphy.com/v1/gifs/search?q="+headline+"&api_key=dc6zaTOxFJmzC&limit=1").then((response)=>{
        return response.json()
      }).then((callback)=>{
        state.complete.push(
          {
          image:callback.data[0].embed_url,
          headline:headline
          }
      )
      }).then(()=>{
        renderNews(state,container)
      })
    }

    function spud(){
      state.articles.forEach((headline)=>{
        giphy(headline)
      })
    }


    function renderNews(data,into) {
      into.innerHTML = `
        <section id="main" class="wrapper">
        ${data.complete.map((article)=>{
          return `${renderArticle(article)}`
        }).join("")}
        </section>
      `
    }
    function renderArticle(article){
      return `
      <section class="article-content">
        <h2>${article.headline}</h3></a>
      </section>
      <section class="featured-image">
        <div style="width:100%;height:0;padding-bottom:63%;position:relative;"><iframe src="${article.image}" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="${article.image}">via GIPHY</a></p>
      </section>
      `
    }

    getGuard()


// })();
