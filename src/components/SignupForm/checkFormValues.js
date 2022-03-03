const checkFormValue = (values, setIsFormValidated) => {
    setIsFormValidated(false);
    //controle des champs vides
    if (
        !values.username ||
        !values.email ||
        !values.emailConfirm ||
        !values.password ||
        !values.passwordConfirm
    )
        return "Tous les champs doivent être complétés";
    else if (values.username.length < 3)
        return "Le nom d'utilisateur doit contenir au moins 3 caractères";

        // controle que le nom ne contient que des lettres et des chiffres
    else if (!/^[A-Za-z0-9]*$/.test(values.username))
        return "Le nom d'utilisateur ne doit contenir que des lettres et des chiffres";

    else if ((/^[0-9]*$/).test(values.username))
        return "Le nom d'utilisateur doit contenir au moins une lettre";

    else if (values.email !== values.emailConfirm)
        return "Les adresses email ne correspondent pas";

        // controle si les deux password sont différents
    else if (values.password !== values.passwordConfirm)
        return "Les mot de passe ne correspondent pas";
        // je vérifie que le mot de passe correspond aux critères:
        // au moins 8 caractères
        // contient au moins une majuscule et une minuscule
        // contient au moins un chiffre

    else if (
        !(values.password.length >= 8 &&
        /[A-Z]/.test(values.password) &&
        /[a-z]/.test(values.password) &&
        /\d/.test(values.password))
    )
    return "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule et un chiffre";

    else setIsFormValidated(true);
}

export default checkFormValue;