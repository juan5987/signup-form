import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import checkFormValue from './checkFormValues';
import 'styles/auth.scss';
import axios from 'axios';

const SignupForm = () => {

  const signupFormInitialValues = {
    username: "", 
    email: "", 
    emailConfirm: "",
    password: "",
    passwordConfirm: "",
  };

  const [signupFormValues, setSignupFormValues] = useState(signupFormInitialValues);
  const [signupPasswordVisibility, setSignupPasswordVisibility] = useState(false);
  const [signupErrorMsg, setSignupErrorMsg] = useState(null);
  const [signupSuccessMsg, setSignupSuccessMsg] = useState(null);
  const [isFormValidated, setIsFormValidated] = useState(false);

  useEffect(() => {
    isFormValidated &&
    // Ici j'effectue la requête pour envoyer les données en BDD
    // il  faudra ici indiquer l'url du serveur en charge d'insérer les données en BDD
    axios({
      method: "post",
      url: "http://localhost:3001/signup",
      data:{
        user: signupFormInitialValues,
      }
    })
    .then( response => {
      // en cas de succès de la requête, j'affiche un message confirmant l'inscription
      // il faudra donc indiquer la variable contenant le message renvoyé par le back en argument de la fonction setSignupSuccessMsg
      setSignupSuccessMsg("Compte crée avec succès, vous pouvez vous connecter");
      setSignupFormValues(signupFormInitialValues);
    })
    .catch(error => {
      // en cas d'erreur, je stocke le message du back spécifiant la raison de l'échec dans la variable signupErrorMsg du state
      // par exemple: "Cette adresse email est déjà enregistrée"
      // ici si le back n'envoie pas de réponse, je retourne une string
      setSignupErrorMsg("Impossible d'obtenir une réponse du serveur");
    })
    .finally(() => setIsFormValidated(false));
  }, [isFormValidated])

  const handleToggleSignupPasswordVisibility = () => {
    setSignupPasswordVisibility(!signupPasswordVisibility);
  };

  const handleInputChange = (event) => {
    // Je stocke le nom et la valeur de l'élément Input
    const {name, value} = event.target;
    // Je modifie le state, je modifie la clé de l'objet signupFormValues qui porte le nom de l'input avec la valeur de l'input
    setSignupFormValues({
      ...signupFormValues,
      [name]: value,
    });
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setSignupErrorMsg(null);
    // La fonction checFormValue vérifie les données du formulaire
    // elle retourne un message d'erreur en cas de données non-conformes
    // si les données sont conformes, elle modifie le booléen IsFormValidated qui déclenchera la requête vers le back
    setSignupErrorMsg(checkFormValue(signupFormValues, setIsFormValidated));
  }

  return (
    <form className="auth-form" onSubmit={handleSubmitForm}>
      <h2 className="auth-form__title">Formulaire d'inscription</h2>
      <div className="auth-form__wrapper">
        <label className="auth-form__wrapper__label">Nom d'utilisateur</label>
        {/* Sur chaque input je prévois une classe pour entourer les inputs vide en rouge */}
        <input onChange={handleInputChange} className={signupErrorMsg && !signupFormValues.username ? "auth-form__wrapper__input inputError" : "auth-form__wrapper__input"} name="username"/>
        <span className="auth-form__wrapper__infos">3 caractères minimum</span>
      </div>
      <div className="auth-form__wrapper">
        <label className="auth-form__wrapper__label">Adresse email</label>
        <input onChange={handleInputChange} className={signupErrorMsg && !signupFormValues.email ? "auth-form__wrapper__input inputError" : "auth-form__wrapper__input"} type="email" name="email"/>
        <span className="auth-form__wrapper__infos">Un email de confirmation vous sera envoyé</span>
      </div>
      <div className="auth-form__wrapper">
        <label className="auth-form__wrapper__label">Adresse email (confirmation)</label>
        <input onChange={handleInputChange} className={signupErrorMsg && !signupFormValues.emailConfirm ? "auth-form__wrapper__input inputError" : "auth-form__wrapper__input"} type="email" name="emailConfirm"/>
        <span className="auth-form__wrapper__infos">Un email de confirmation vous sera envoyé</span>
      </div>
      <div className="auth-form__wrapper">
        <label className="auth-form__wrapper__label">Mot de passe</label>
        <input onChange={handleInputChange} className={signupErrorMsg && !signupFormValues.password ? "auth-form__wrapper__input inputError" : "auth-form__wrapper__input"} type={signupPasswordVisibility ? "text" : "password"} value={signupFormValues.password} autoComplete="new-password" name="password"/>
        <span className="auth-form__wrapper__infos">Doit contenir au moins 8 caractères, une minuscule, une majuscule et un chiffre</span>
        {
          signupPasswordVisibility ?
          <Eye className="auth-form__wrapper__icon" onClick={handleToggleSignupPasswordVisibility} /> 
          : 
          <EyeOff className="auth-form__wrapper__icon" onClick={handleToggleSignupPasswordVisibility} />
        }
      </div>
      <div className="auth-form__wrapper">
        <label className="auth-form__wrapper__label">Mot de passe (confirmation)</label>
        <input onChange={handleInputChange} className={signupErrorMsg && !signupFormValues.passwordConfirm ? "auth-form__wrapper__input inputError" : "auth-form__wrapper__input"} type={signupPasswordVisibility ? "text" : "password"} value={signupFormValues.passwordConfirm} autoComplete="new-password" name="passwordConfirm"/>
        <span className="auth-form__wrapper__infos">Doit contenir au moins 8 caractères, une minuscule, une majuscule et un chiffre</span>
        {
          signupPasswordVisibility ?
          <Eye className="auth-form__wrapper__icon" onClick={handleToggleSignupPasswordVisibility} /> 
          : 
          <EyeOff className="auth-form__wrapper__icon" onClick={handleToggleSignupPasswordVisibility} />
        }
      </div>
      <div className="auth-form__errorMsg">
        <p className="auth-form__errorMsg__content">
          {signupErrorMsg}
        </p>
      </div>
      {
        signupSuccessMsg &&
        <span className="auth-form__successMsg">{signupSuccessMsg}</span>
      }
      {
        isFormValidated &&
        <>
          <div className="loader"></div>
          <span className="loader-content">Veuillez patienter</span>
        </>
      }
      <button className="auth-form__submit" type="submit">S'inscrire</button>
    </form>
  )
};

export default SignupForm;