BlogApp.service('databaseService',['uuid2', function(uuid2){
    if(localStorage.getItem('users') == null){
        this.users = [{username: 'Admin', mail: 'Admin@admin.com', password: 'safepassword', admin: 'Yes', image: 'https://puu.sh/v5JIK/9048eb6095.jpg',  id: uuid2.newuuid()}];
        localStorage.setItem('users', JSON.stringify(this.users));
    }
    if(localStorage.getItem('posts') == null){
        this.posts = [{title: 'kroketten', body: 'zijn vies...', date: new Date('2002-04-26T09:00:00'), image: 'http://static.boredpanda.com/blog/wp-content/uploads/2015/01/brothers-grimm-wanderings-landscape-photography-kilian-schonberger-3.jpg', id: 0},{title: 'test', body: 'This is a test...', date: new Date, image: 'http://i.imgur.com/tAHVmXi.jpg', id: 1},{title: 'test', body: 'zijn vies...', date: new Date, image: 'https://digital-photography-school.com/wp-content/uploads/flickr/4952370052_52f4a93158_o.jpg', id: 2}];
        localStorage.setItem('posts', JSON.stringify(this.posts));
    }
    if(localStorage.getItem('comments') == null){
        this.comments = [{user: this.users[0].username, post: this.posts[0].id, date: new Date, comment: 'this is a test', image: this.users[0].image,  id: uuid2.newuuid()}];
        localStorage.setItem('comments', JSON.stringify(this.comments));
    }

    this.get = function(){
        this.users = JSON.parse(localStorage.getItem('users'));
        this.posts = JSON.parse(localStorage.getItem('posts'));
        this.comments = JSON.parse(localStorage.getItem('comments'));
    };
}]);