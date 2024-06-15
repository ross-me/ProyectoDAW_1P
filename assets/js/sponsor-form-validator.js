let name;
let email;
let phone;
let lastname;

document.getElementById("submit-sponsor").addEventListener("click", e => send())

const send = () => {
    name = document.getElementById("name-sponsor").value;
    email = document.getElementById("email-sponsor").value;
    phone = document.getElementById("phone-sponsor").value;
    lastname = document.getElementById("lastname-sponsor").value;

    let validate = false;

    validate = validate_name(name);
    validate = validate_phone(phone);
    validate = validate_email(email);
    validate = validate_lastname(lastname);


    if (validate) write_info();
    else alert("Formulario no válido");
}

const write_info = () => { alert("Información enviada."); }

const validate_name = name => {
    let regex = /\d/;

    name = name.replace(/\s/g, '');

    if (regex.test(name))
        return false;

    return true && name.length >= 3;
}

const validate_lastname = lastname => {
    return validate_name(lastname);
}

const validate_phone = phone => {
    var regex = /[a-zA-Z]/;

    phone = phone.replace(/\s/g, '');

    if (regex.test(phone))
        return false;

    return phone.startsWith("09") && phone.length == 10;
}

const validate_email = email => {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email))
        return true;
    return false;
}
