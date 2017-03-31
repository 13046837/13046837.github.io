describe('E2E: MainController', function() {

    beforeEach(function() {
        browser.get('http://localhost:3000/#!/');
    });
    
    it('should display a proper h1 message', function() {

        var h3 = element(by.tagName('h3'));
        var h3Text = h3.getText();
        expect(h3Text).toBe("Test");
    });

});