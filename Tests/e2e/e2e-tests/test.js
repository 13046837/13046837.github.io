describe('E2E: LoginController', function() {

    beforeEach(function() {
        browser.get('http://localhost:3000/#!/login');
    });
    
    it('should login', function() {

        element(by.className('username')).sendKeys("Admin");
        element(by.className('password')).sendKeys("safepassword");
        element(by.className('submitButton')).click();
        expect(element(by.css('[href="#!/create"]')).isDisplayed()).toBeTruthy();

    });

});

describe('E2E: MainController', function() {

    beforeEach(function() {
        browser.get('http://localhost:3000/#!/');
    });
    
    it('should display the correct post', function() {
        element.all(by.repeater('x in dates')).get(1).element(by.linkText('April 2002')).click()
        var h3 = element(by.tagName('h3'));
        expect(h3.getText()).toBe('Kroketten');
    });

});