export class functions{
  static GenEmail(){
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var result = "cy_";

    for ( var i = 0; i < 7; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    result+= "@cy.com";

    return result;
  }

  static GenWrongEmail(){
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var result = "cy_";

    for ( var i = 0; i < 7; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    result+= ".com";

    return result;
  }

  static GenText(){
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var result = "";

    for ( var i = 0; i < 15; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  static GenDeviceNumber(){
    var characters = '0123456789';
    var charactersLength = characters.length;
    var result = "";

    for ( var i = 0; i < 15; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  static GenLatLng(){
    var characters = '0123456789';
    var charactersLength = characters.length;
    var result = "";
    var decimal = 2;

    if(Math.random() < 0.5){
      result += "-";
      decimal++;
    }

    for ( var i = 0; i < decimal; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    result+= ".";

    for ( var i = 0; i < 6; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }


  static wrongLatLng(){
    var characters = '0123456789';
    var charactersLength = characters.length;
    var result = "";
    var decimal = 2;

    if(Math.random() < 0.5){
      result += "-";
      decimal++;
    }

    for ( var i = 0; i < decimal; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    for ( var i = 0; i < 5; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    result+="x";

    return result;
  }
}

