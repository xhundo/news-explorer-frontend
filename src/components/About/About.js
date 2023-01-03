import './About.css';
import author from '../../images/image-03.jpg';

function About() {
  return (
    <section className="about">
      <img className="about-author__photo" src={author} />
      <div className="about__author-text">
        <h2 className="about__text">About the author</h2>
        <article className="about__article">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </article>
        <article className="about__article">
          You can also talk about your experience with Practicum, what you
          learned there, and how you can help potential customers.
        </article>
      </div>
    </section>
  );
}

export default About;
