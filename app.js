// (function () {

  var container = document.getElementById('mainContainer')
  var apiKey = "99f838b1a5494c3e8ec4ed5de3e550cb";
  let state = {
		guardURL : "https://newsapi.org/v1/articles?source=breitbart-news&sortBy=top&apiKey=99f838b1a5494c3e8ec4ed5de3e550cb",
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
	  		callback.articles.forEach((guard,index)=>{
	  			state.articles.push(guard.title)
          if(index>11){
            return false
          }
	  		})
			}).then(()=>{
        spud()
      })
		}


    function giphy(headline){
      fetch("https://api.giphy.com/v1/gifs/search?q="+headline+"&api_key=dc6zaTOxFJmzC&limit=1").then((response)=>{
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
      return `<div class="col-md-3 col-xs-6 complete-article">
      <section class="article-content">
        <h4>${article.headline}</h4></a>
      </section>
      <section class="featured-image img-responsive">
        <div style="width:100%;height:0;padding-bottom:63%;position:relative;"><iframe src="${article.image}" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="${article.image}">via GIPHY</a></p>
      </section></div>
      `
    }

    getGuard()


// })();
