import SignupForm from 'components/SignupForm';
import 'styles/app.scss';

function App() {
  return (
    <div className="App">
      <SignupForm isLogged={false}/>
    </div>
  );
}

export default App;
