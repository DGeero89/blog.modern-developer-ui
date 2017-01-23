(function (window){

	/*
	*
	* Blog data object
	*
	*/
	var blog = {
		siteTitle: 'Blog.Bov-Academy',
		articleList: [],

		// Return articles
		get articles() {
			return this.articleList;
		},

		// Add new article to article list
		set articles(article) {
			this.articleList.push(article);
		},

		// Add comment to article and append comment to DOM
		addComment: function(e) {
			var mainContent = document.getElementById('main-content'),
					articleTitle = mainContent.querySelector('.blog-title').textContent,
					comment = e.target.querySelector('textarea'),
					user = "John Doe";

			// Loop over article list. Find matching article, create Comment Object and push to comment array
			for(var i = 0; i < this.articleList.length; i++){
				if( utilities.find(this.articleList[i], articleTitle)){
					var newComment = new Comment(this.articleList[i].comments.length+1, user, comment.value);
					this.articleList[i].__comments = newComment;
					appendComment(newComment);
				}
			}

			// Reset comment value
			comment.value = "";
		}
	},

	// Helper object
	Helper = {
		get __timeStamp(){
			var oneDay = 1000 * 60 * 60 * 24,
			datePosted = this.date,
			today = new Date(Date.now()).getTime(),
			differenceInMils = (today - datePosted);
			daysAgo = Math.round(differenceInMils/oneDay);

			console.log(datePosted);
			console.log(today);
			console.log(differenceInMils);
			console.log(daysAgo);
			if(daysAgo > 1){
				return daysAgo + " days ago";
			} else if(daysAgo == 1){
				return daysAgo + " day ago";
			} else if(daysAgo <= -1) {
				return Math.abs(daysAgo) + " days from now";
			} else {
				return "Today";
			}

		},

		set __timeStamp(time){
			this.date = Date.parse(new Date(time));
		}

	};

	/*
	*
	* Article object contructor
	*
	*/

	function Article(title, date, author, authImg, featureImg, content, tags, id) {
		this.title = title || "";
		this.date = Date.parse(date) || new Date(Date.now());
		this.author = author || "admin";
		this.authImg = authImg || "http://placehold.it/48x48";
		this.featureImg = featureImg || "http://placehold.it/896x370";
		this.content = content || "";
		this.tags = tags || [];
		this.comments = [];
		this.id = blog.articleList.length+1;
	}

	/*
	*
	* Comment object contructor
	*
	*/

	function Comment(id, userId, content, userAvatar) {
		this.id = id;
		this.date = new Date(Date.now());
		this.userId = userId || "Bob";
		this.userAvatar = userAvatar || "https://s7.postimg.org/yxe2oau3f/stupid.jpg";
		this.content = content || "Comment";
	}

	// Implement prototypical inheritance
	Comment.prototype = Helper;
	Article.prototype = Helper;

	// Define get and set methods for Article prototype
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
				return this.comments;
			},

			set: function(comment){
				this.comments.push(comment);
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

	// Function to append new comment ot the DOm
	function appendComment(comment) {

		var commentsSection = document.querySelector('.article-comments'),
				newCommentHTML;
		console.log(commentsSection);
		newCommentHTML = `
			<div class="user-comment">
				<div class="comment-avatar">
					<img class="avatar" src="${comment.userAvatar}">
				</div>
	      <p class="avatar-name"><strong>${comment.userId}</strong></p>
	      <p class="avatar-timestamp">${comment.__timeStamp}</p>
	      <p class="avatar-comments">"${comment.content}"</p>
	      <p class="comment-reply">Reply</p>
      </div>
      `;

      commentsSection.innerHTML += newCommentHTML;
	}

	blogInit();
	window.blog = blog;

})(window);