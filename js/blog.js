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
		this.tags = tags || [];
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

			},

			__timeStamp: {

				get: function() {
					var oneDay = 1000 * 60 * 60 * 24,
							datePosted = new Date(this.date),
							today = new Date(Date.now()).getTime(),
							differenceInMils = (today - datePosted);
							daysAgo = Math.round(differenceInMils/oneDay);
					
					if(daysAgo > 1){
						return daysAgo + " days ago";
					} else if(daysAgo == 1){
						return daysAgo + " day ago";
					} else if(daysAgo <= -1) {
						return Math.abs(daysAgo) + " days from now";
					}
				},

				set: function(time) {
					this.date = Date.parse(new Date(time));
				}
			
			}

		});


	/*
	*
	* Init blog function used to text adding articles to blog object
	*
	*/

	function blogInit() {
		var mainContent = document.getElementById('main-content'),
				articleTitle = mainContent.querySelector('.blog-title').textContent,
				postDate = '1/19/2017',
				author = mainContent.querySelector('.author').textContent,
				authorImg = mainContent.querySelector('.author-img img').src,
				featuredImg = mainContent.querySelector('.featured-img img').src,
				articleContent = mainContent.querySelector('.blog-content').innerHTML,
				articleTagElements = document.querySelectorAll('.tag-button'),
				recentArticles = document.querySelectorAll('.article-title'),
				tagsArray = [],
				recentArticlesArr = [],
				articlesArr = [];

		// Push tags to tags array
		for(var i = 0; i < articleTagElements.length; i++) {
			tagsArray.push(articleTagElements[i].textContent);
		}

		// Push main article to articles array
		articlesArr.push(new Article(articleTitle, postDate , author, authorImg, featuredImg, articleContent, tagsArray));

		// Add recent articles to article array
		for(var j = 0; j < recentArticles.length; j++){
			articlesArr.push(new Article(recentArticles[j].textContent));
		}

		// Add article to blog article list
		for(var k = 0; k < articlesArr.length; k++) {
			blog.articles = articlesArr[k];
		}

		// Set Timestamp of post
		mainContent.querySelector('.post-date').innerHTML = blog.articleList[0].__timeStamp;
	}

	blogInit();
	window.blog = blog;

})(window);