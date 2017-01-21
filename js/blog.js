(function (window){

	/*
	*
	* Blog data object
	*
	*/
	var blog = {
		siteTitle: 'Blog.Bov-Academy',
		articleList: [],
		get articles() {
			return this.articleList;
		},
		set articles(article) {
			this.articleList.push(article);
		}
	};

	/*
	*
	* Article object contructor
	*
	*/

	function Article(title, date, author, authImg, featureImg, content, tags) {
		this.title = title || "";
		this.date = Date.parse(date) || new Date(Date.now());
		this.author = author || "admin";
		this.authImg = authImg || "http://placehold.it/48x48";
		this.featureImg = featureImg || "http://placehold.it/896x370";
		this.content = content || "";
		this.tag = tags || [];
		this.comments = [];
		
	}

	Object.defineProperties(Article.prototype, {
			
			__content: {
				get: function() {
					return content;
				},

				set: function(newVal){
					content = newVal;
				}
			},

			__comments: {
				
				get: function() {
					return comments;
				},

				set: function(comment){
					comments.push(comment);
				}

			}

		});




	function blogInit() {
		var mainContent = document.getElementById('main-content'),
				articleTitle = mainContent.querySelector('.blog-title'),
				authorImg = mainContent.querySelector('.author-img img').src;


		var articles = [ 
				new Article(articleTitle),
				new Article("Getting Your Selected Articles Published on Encyclopedia")

					];

		for(var i = 0; i < articles.length; i++) {
			blog.articles = articles[i];
		}

	}

	blogInit();
	window.blog = blog;

})(window);