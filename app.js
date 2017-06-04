// (function () {
  var mainContainer = document.querySelector("#mainContainer");

  let state = {
		guardURL : "https://content.guardianapis.com/search?api-key=2b9272f0-a832-4fe2-9fca-c004a4fa70a3",
	 	articles:[],
    complete:[],
	 	articleReset:function(){
	 		state.articles =[],
      state.complete =[]
	 	}
	}


	function getGuard(){
      // renderLoading(state,container)
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
      fetch("http://api.giphy.com/v1/gifs/search?q="+headline+"&api_key=dc6zaTOxFJmzC&limit=1").then((response)=>{
        return response.json()
      }).then((callback)=>{
        state.complete.push(
          {
          image:callback.data[0].embed_url,
          headline:headline
          }
      )
      }).then(()=>{
      renderNews(state,mainContainer)})
    }

    function spud(){
      state.articles.forEach((headline)=>{
        giphy(headline)
        // renderNews(state,mainContainer)
      })}



    function renderArticle(article){
      return `
				<section class="featured-image">
		    	<img src="${article.image}" alt="" />
		    </section>
		    <section class="article-content">
		    	<h2>${article.headline}</h3></a>
		     </section>
       </section>`
    }

    function renderNews(data, into) {
      into.innerHTML = `
        <section id="main" class="wrapper">
        ${state.complete.map((article)=>{
          return `${renderArticle(article)}`
        }).join("")}
        </section>
      `
    }

    getGuard()

// })();
