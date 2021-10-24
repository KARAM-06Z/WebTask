import {functions} from "../support/functions";

describe('Webtask Test', () => {
  var email = functions.GenEmail();
  var wrongEmail = functions.GenWrongEmail();
  var password = functions.GenText();
  var secondPassword = functions.GenText();

  var deviceNumber = functions.GenDeviceNumber();
  var deviceName = functions.GenText();

  var wronglatlng = functions.wrongLatLng();

  it('Wrong log in', () => {
    cy.visit('/');

    cy.login(email , password+"cypress");

    cy.wait(1000);

    cy.login(email , password);

    cy.wait(1000);
  });

  it('Sign up', () => {
    cy.visit('/signup');

    cy.signup("cypress@cy.com" , password , password);

    cy.wait(1000);

    cy.signup(wrongEmail , password , secondPassword);

    cy.wait(1000);

    cy.signup(email , password , secondPassword);

    cy.wait(1000);

    cy.signup(email , password , password);
  });


  it('Correct log in', () => {
    cy.visit('/');

    cy.login_correct(email , password);
  });

  it('Filter' , () => {
    cy.filter();
  });

  it('Search' , () => {
    cy.search(deviceNumber);

    cy.wait(1000);
    cy.get("input[name='search']").clear();
  });

  it("CreateDevice" , () => {
    var latitude = functions.GenLatLng();
    var longitude = functions.GenLatLng();

    while((parseFloat(latitude) > 140 || parseFloat(latitude) < -140) || (parseFloat(longitude) > 140 || parseFloat(longitude) < -140)){
      latitude = functions.GenLatLng();
      longitude = functions.GenLatLng();
    }

    cy.get("button[id='create_devices_button']").click();

    cy.CreateDevice(deviceNumber , deviceName , wronglatlng , longitude);

    cy.wait(1000);
    cy.get("input[id='latitude']").clear();

    cy.CreateDevice(deviceNumber , deviceName , latitude , longitude);
  });

  it("DeleteDevice" , () => {
    cy.get("label[for='CB0']").click();
    cy.wait(1000);

    cy.get("button[id='delete_devices_button']").click();
    cy.get("button[class='device_submit']").click();
  });

  it("Logout" , () => {
    cy.get("button[id='profile_button']").click();
    cy.wait(500);
    cy.get("button[id='logout_button']").click();
  });
})
