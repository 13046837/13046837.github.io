describe('Test if title Filter works', function(){
    var $filter;

    beforeEach(function(){
        module('BlogApp');

        inject(function(_$filter_){
            $filter = _$filter_;
        });
    });

    it('should filter the first letter to uppercase', function(){
       var input = 'kroketten';
       var result = $filter('titleFilter')(input);
       expect(result).toBe('Kroketten');
    });
});

describe('Test if the archive works', function(){
    var archiveService;
    var posts = [{title: 'kroketten', body: 'zijn vies...', date: new Date('2002-04-26T09:00:00'), image: 'kaas', id: 0}, {title: 'kroketten2', body: 'zijn vies...', date: new Date('2004-04-26T09:00:00'), image: 'kaas', id: 1}];
   
    beforeEach(function(){
        module('BlogApp');

        inject(function(_archiveService_){
            archiveService = _archiveService_;
        });
    });

    it('should fill the dates array with dates', function(){
       var dates = archiveService.fillArchive(posts);
       expect(dates).toEqual([{dateString: 'April 2002', month: 3, year: 2002}, {dateString: 'April 2004', month: 3, year: 2004}]);
    });

    it('should filter the posts based on date', function(){
       var Fposts = archiveService.filterPosts(posts, 3, 2002);
       expect(Fposts).toEqual([{title: 'kroketten', body: 'zijn vies...', date: new Date('2002-04-26T09:00:00'), image: 'kaas', id: 0}]);
    });
});

describe('RegisterController username check', function() {
  beforeEach(module('BlogApp'));

  var $controller;
  var accountService;

  beforeEach(inject(function(_$controller_, _accountService_){
    $controller = _$controller_;
    accountService = _accountService_
  }));

  describe('$scope.checkUsername', function() {
    it('should show the too long message', function() {
      spyOn(accountService, 'isUsernameUnique').and.returnValue(true);
      var $scope = {};
      var controller = $controller('registerController', { $scope: $scope });
      $scope.usernameError = '';
      $scope.username = 'muchtoolongpassword';
      $scope.checkUsername();
      expect($scope.usernameError).toEqual('This username is too long.');
    });

    it('should show the too short message', function() {
      spyOn(accountService, 'isUsernameUnique').and.returnValue(true);
      var $scope = {};
      var controller = $controller('registerController', { $scope: $scope });
      $scope.usernameError = '';
      $scope.username = 'test';
      $scope.checkUsername();
      expect($scope.usernameError).toEqual('This username is too short.');
    });

    it('should show the the username is available message', function() {
      spyOn(accountService, 'isUsernameUnique').and.returnValue(true);
      var $scope = {};
      var controller = $controller('registerController', { $scope: $scope });
      $scope.usernameError = '';
      $scope.username = 'username';
      $scope.checkUsername();
      expect($scope.usernameError).toEqual('This username is available.');
    });

    it('should show the the username is taken message', function() {
      spyOn(accountService, 'isUsernameUnique').and.returnValue(false);
      var $scope = {};
      var controller = $controller('registerController', { $scope: $scope });
      $scope.usernameError = '';
      $scope.username = 'username';
      $scope.checkUsername();
      expect($scope.usernameError).toEqual('This username is already in use.');
    });
  });
});

describe('Test if the databaseService and the getPost function from the postService works', function(){
    var postService;

    beforeEach(function(){
        module('BlogApp');

        inject(function(_postService_){
            postService = _postService_;
        });
    });

    it('should filter the first letter to uppercase', function(){
       var post = postService.getPost(0);
       expect(post).toEqual({title: 'kroketten', body: 'zijn vies...', date: '2002-04-26T09:00:00.000Z', image: 'http://static.boredpanda.com/blog/wp-content/uploads/2015/01/brothers-grimm-wanderings-landscape-photography-kilian-schonberger-3.jpg', id: 0});
    });
});