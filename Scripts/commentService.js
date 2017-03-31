BlogApp.service('commentService',['databaseService', function(databaseService){
     this.getComments = function(id){
        databaseService.get();
        var commentList = [];
        databaseService.comments.forEach(function(e, i) {
            if(e.post == id) {
                commentList.push(e);
            }
        })
        return commentList;
    };

    this.postComment = function(data){
        databaseService.get();
        databaseService.comments.push(data);
        localStorage.setItem('comments', JSON.stringify(databaseService.comments));
    };

    this.editComment = function(id, editText) {
        databaseService.get();
        var commentIndex;
        databaseService.comments.forEach(function(e, i) {
            if(e.id == id){
                console.log(i);
                console.log(e);
                commentIndex = i;
            }
        })
        if(commentIndex != null) {
            databaseService.comments[commentIndex].comment = editText;
            localStorage.setItem('comments', JSON.stringify(databaseService.comments));
        }
    };

    this.deleteComment = function(id){
        databaseService.get();
        var commentIndex;
        databaseService.comments.forEach(function(e, i) {
            if(e.id == id){
                console.log(i);
                console.log(e);
                commentIndex = i;
            }
        })
        if(commentIndex != null) {
            databaseService.comments.splice(commentIndex, 1);
            localStorage.setItem('comments', JSON.stringify(databaseService.comments));
        }
    };
}]);