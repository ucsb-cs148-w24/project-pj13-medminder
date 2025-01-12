import SignIn from "../components/SignIn";
import '../App.css';
import '../Circles.css';
import medicon from '../images/medicon.png';

function Home() {
  return (
    <div className='home-page'>
      <div className="Home">
        <img src={medicon} alt="Medicon" className="mediconImage" />
        <h1 className="title">Medminder</h1>
        <p className="slogan">Your medicine reminder.. one pill at a time</p>
        <SignIn />
      </div>

      <div className="circle"></div>
      <div className="circle2"></div>
      <div className="circle3"></div>
      <div className="circle4"></div>
      <div className="circle5"></div>
      <div className="circle6"></div>
    </div>
  );
}

export default Home;
