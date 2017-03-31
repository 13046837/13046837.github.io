BlogApp.service('archiveService', ['databaseService', function(databaseService){
    var dates = [];

    this.fillArchive = function(posts){
        posts.forEach(function(e, i) {     
            var date = new Date(e.date);
            var dateString;
            var month;
            var year;
            if(date.getMonth() == 0){
                dateString = 'January ' + date.getFullYear()
            }else if(date.getMonth() == 1){
                dateString = 'February ' + date.getFullYear()
            }else if(date.getMonth() == 2){
                dateString = 'March ' + date.getFullYear()
            }else if(date.getMonth() == 3){
                dateString = 'April ' + date.getFullYear() 
            }else if(date.getMonth() == 4){
                dateString = 'May ' + date.getFullYear() 
            }else if(date.getMonth() == 5){
                dateString = 'June ' + date.getFullYear()
            }else if(date.getMonth() == 6){
                dateString = 'July ' + date.getFullYear()
            }else if(date.getMonth() == 7){
                dateString = 'August ' + date.getFullYear()
            }else if(date.getMonth() == 8){
                dateString = 'September ' + date.getFullYear()
            }else if(date.getMonth() == 9){
                dateString = 'October ' + date.getFullYear()
            }else if(date.getMonth() == 10){
                dateString = 'November ' + date.getFullYear()
            }else if(date.getMonth() == 11){
                dateString = 'December ' + date.getFullYear()
            }
            var duplicate = false;
            dates.forEach(function(e, i) { 
                if(e.dateString == dateString){
                    duplicate = true;
                }
            })
            if(duplicate != true){
                month = date.getMonth();
                year = date.getFullYear();
                dates.push({dateString: dateString, month: month, year: year});
            }
        })
        return dates;
    }

    this.filterPosts = function(posts, month, year){
        var Fposts = [];
        posts.forEach(function(e, i) { 
            var date = new Date(e.date);
            if(date.getMonth() == month && date.getFullYear() == year){
                Fposts.push(e);
            }
        })
        return Fposts;
    }
}]);

