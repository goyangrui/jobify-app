import main from "../assets/images/main-alternative.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby normcore glossier chicharrones yes plz narwhal godard
            snackwave tumeric crucifix hashtag helvetica vaporware bushwick banh
            mi. Trust fund kogi cred af bitters deep v retro craft beer shaman
            microdosing migas keytar occupy plaid quinoa. Williamsburg pok pok
            hexagon artisan air plant butcher roof party tattooed. Etsy
            church-key raw denim brooklyn. Affogato tilde la croix, YOLO tonx
            salvia portland. Chicharrones yuccie iPhone freegan put a bird on it
            actually 8-bit enamel pin williamsburg fashion axe brooklyn artisan
            echo park.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
}

export default Landing;
