const checkFormValue = (values, setIsFormValidated) => {
    setIsFormValidated(false);
    //si il y a un champ vide
    if (
        !values.username ||
        !values.email ||
        !values.emailConfirm ||
        !values.password ||
        !values.passwordConfirm
    )
        return "Tous les champs doivent être complétés";
        // ou si les deux emails sont différents
    else if (values.email !== values.emailConfirm)
        return "Les adresses email ne correspondent pas";
        // ou si les deux password sont différents
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
    return "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre";
    else setIsFormValidated(true);
}

export default checkFormValue;