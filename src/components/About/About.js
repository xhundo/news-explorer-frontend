import './About.css';
import author from '../../images/author.jpg';

/* This block describes the project author. Here you should indicate your
name, what you do, and which development technologies you know. */

// You can also talk about your experience with Practicum, what you
// learned there, and how you can help potential customers.

function About() {
  return (
    <section className="about">
      <img
        className="about-author__photo"
        src={author}
        alt="Photo of Kurtney Joseph"
      />
      <div className="about__author-text">
        <h2 className="about__text">About the author</h2>
        <p className="about__article">
          Kurtney Joseph is a full-stack software engineer experienced with a
          proficient foundation in JavaScript, React and Node.js and is highly
          driven to constantly learn new technologies to provide scalable,
          cutting-edge, and maintable software solutions to effectively build,
          and scale teams for companies and organizations.
        </p>
        <p className="about__article">
          Practicum was a great experience and opportunity to build my skills to
          bring value to teams and organizations. I've learned over 740+ hours
          of HTML, CSS, JavaScript, React, Express, Node, and MongoDB. These
          skills have tremendously helped me scale teams, build better
          development enviorments and to provide cutting-edge web applications
          to serve users a great web experience.
        </p>
      </div>
    </section>
  );
}

export default About;
