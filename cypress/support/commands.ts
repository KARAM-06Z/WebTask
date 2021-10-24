// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
  declare namespace Cypress {
    interface Chainable<Subject = any> {
      login(email: string , password: string): typeof login;
      login_correct(email: string , password: string): typeof login_correct;
      singup(email: string , password: string , repeatpassword: string): typeof signup;
      search(number: string): typeof search;
      filter(): typeof filter;
      CreateDevice(number:string , name:string , latitude:string , longitude:string): typeof CreateDevice;
    }
  }

  function login(email: string , password: string): void {
    cy.get("input[name='email']").clear();
    cy.get("input[name='password']").clear();


    cy.get("input[name='email']").type(email);
    cy.get("input[name='password']").type(password);
    cy.get("button[type='submit']").click();

    cy.url().should("not.include" , "devices");
  }

  function login_correct(email: string , password: string): void {
    cy.get("input[name='email']").clear();
    cy.get("input[name='password']").clear();


    cy.get("input[name='email']").type(email);
    cy.get("input[name='password']").type(password);
    cy.get("button[type='submit']").click();
  }

  function signup (email: string , password: string , repeatpassword: string){
    cy.get("input[name='email']").clear();
    cy.get("input[name='password']").clear();
    cy.get("input[name='repeat_password']").clear();

    cy.get("input[name='email']").type(email);
    cy.get("input[name='password']").type(password);
    cy.get("input[name='repeat_password']").type(repeatpassword);
    cy.get("button[type='submit']").click();

    cy.url().should("not.include" , "devices");
  }

  function filter(){
    cy.get("input[id='Device_id_sort_check']").click();
    cy.wait(1000);
    cy.get("input[id='Device_number_sort_check']").click();
    cy.wait(1000);
    cy.get("input[id='Device_name_sort_check']").click();
    cy.wait(1000);
    cy.get("input[id='Device_name_sort_check']").click();
    cy.wait(1000);
  }

  function search(number:string){
    cy.get("input[name='search']").clear();
    cy.get("input[name='search']").type(number);
  }

  function CreateDevice(number:string , name:string , latitude:string , longitude:string){
    cy.get("input[id='number']").type(number);
    cy.get("input[id='name']").type(name);
    cy.get("input[id='latitude']").type(latitude);
    cy.get("input[id='longitude']").type(longitude);

    cy.get("button[class='device_submit']").click();
  }


// NOTE: You can use it like so:
  Cypress.Commands.add('login', login);
  Cypress.Commands.add("login_correct" , login_correct);
  Cypress.Commands.add("signup" , signup);
  Cypress.Commands.add("search" , search);
  Cypress.Commands.add("filter" , filter);
  Cypress.Commands.add("CreateDevice" , CreateDevice);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
