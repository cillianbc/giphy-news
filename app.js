(function () {

  var container = document.getElementById('mainContent')

  // var apiKey = "99f838b1a5494c3e8ec4ed5de3e550cb";
  // var firebaseConfig = {
  //   apiKey: "AIzaSyCePg8Sm5wNMp05c1H6Riad5iT0GIT9A7U",
  //   authDomain: "giph-news.firebaseapp.com",
  //   databaseURL: "https://giph-news.firebaseio.com",
  //   projectId: "giph-news",
  //   storageBucket: "giph-news.appspot.com",
  //   messagingSenderId: "506510631263",
  //   appId: "1:506510631263:web:72b3af351a228e893a16ea",
  //   measurementId: "G-1SDHY7H2V0"
  // };

  // firebase.initializeApp(firebaseConfig);
  // firebase.analytics();


  let state = {
    news : "https://newsapi.org/v2/top-headlines?country=us&apiKey=99f838b1a5494c3e8ec4ed5de3e550cb",
    // reddit:"https://newsapi.org/v2/top-headlines?sources=reddit-r-all&apiKey=99f838b1a5494c3e8ec4ed5de3e550cb",
    // sport:"https://newsapi.org/v2/top-headlines?country=gb&category=sports&apiKey=99f838b1a5494c3e8ec4ed5de3e550cb",
	 	articles:[],
    complete:[],
	 	articleReset:function(){
	 		state.articles =[],
      state.complete =[]
	 	}
  }
  



	function getNews(input){
	  	fetch(input).then((response)=>{
	    return response.json()
		}).then((callback)=>{
      console.log(callback)
        state.articleReset()
        let array = callback.articles
        for (let i = 0; i < array.length; i++) {
          state.articles.push(
            {
              title:array[i].title,
              url:array[i].url
            } 
          )
          if (i === 7) 
          break;
        }
  
	  		// callback.articles.forEach((article,index)=>{
	  		// 	// state.articles.push(
        //   //   {
        //   //     title:article.title,
        //   //     url:article.url
        //   //   } 
        //   // )
        //   // console.log(index)
        //   // if(index>8){
        //   //   break;
        //   // }
	  		// })
			}).then(()=>{
        spud()
      })
		}


    function giphy(headline,url){
      fetch("https://api.giphy.com/v1/gifs/search?q="+headline+"&api_key=dc6zaTOxFJmzC&limit=1").then((response)=>{
        return response.json()
      }).then((callback)=>{
        console.log(callback)
        state.complete.push(
          {
          image:callback.data[0].images.preview_webp.url,
          headline:headline,
          url:url
          }
      )
      }).then(()=>{
        renderNews(state,container)
      })
    }

    function spud(){
      state.articles.forEach((headline)=>{
        giphy(headline.title,headline.url)
      })
    }


    function renderNews(data,into) {
      into.innerHTML = `
        <section id="main" class="row wrapper">
          ${data.complete.map((article)=>{
            return `${renderArticle(article)}`
          }).join("")}
        </section>
      `
    }

    // function sharing(article){
    //   var win = window.open("http://twitter.com/intent/tweet?status="+article.headline+"+"+article.image+"+#cillianbc",'blank');
    //   win.focus();
    
    // }
    function renderArticle(article){
      return `<div class="col-md-3 col-xs-6 complete-article">
      <section class="article-content">
        <h4>${article.headline}</h4></a>
      </section>
      <section class="featured-image img-responsive">
        <div style="width:100%;height:0;padding-bottom:63%;position:relative;"><img src="${article.image}" width="60%" height="60%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></img></div>
      </section></div>
      `
    }


    // function renderArticle(article){
    //   return `
    //   <div class="m-sm-3 cbcCard">
    //   <section class="featured-image img-responsive">
    //     <div style="width:100%;height:0;padding-bottom:63%;position:relative;">
    //       <iframe src="${article.image}" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    //     </div>
    //   </section>
    //   <section class="article-content">
    //   <h5><a href="${article.url}">${article.headline}</a></h5>
    // </section>
    // </div>
    //   `
    // }

    // document.addEventListener("click", function(event){
    //   switch(event.target.id){
    //     case "news":
    //       // loading(state)
    //       getNews(state.news);
    //       break;
    //     case "reddit":
    //       // loading(state)
    //       getNews(state.reddit);
    //       break;
    //     case "sport":
    //       // loading(state)  
    //       getNews(state.sport);
    //       break;
    //   }
    // },false); 
    window.onload = getNews(state.news)

// function loading(container){
//   container.innerHTML = 
//   "<div class='col-md-12'><img class='img-responsive' src='img/source.gif'></div>"
// }
// function renderSharing(article){
//   var win = window.open("http://twitter.com/intent/tweet?status="+article.headline+"+"+article.image+"#cillianbc",'blank');
//   win.focus();

// }
// function buildShareUrl(id,title,url){
//   switch(){
//     case 'facebook':
//       return   `<div class="fb-share-button" 
//       data-href="${url}" 
//       data-layout="button_count">`
//     </div>
//       break;
//     case 'twitter':
//       return "http://twitter.com/intent/tweet?status="+title+"+"+url;
//       break;
//     case 'reddit':
//       return "http://www.reddit.com/submit?url="+title+"&"+url;
//       break;
//   }

// }
})();
