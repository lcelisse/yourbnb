import git from "../../assets/25231.png";
import link from "../../assets/images.jpg";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <footer className="about-us-container">
      <a target="_blank" href="https://github.com/lcelisse">
        <img className="img-git" src={git}></img>
      </a>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/lillyann-h-55684b249"
      >
        {" "}
        <img className="img-git" src={link}></img>
      </a>
    </footer>
  );
};

export default AboutUs;
