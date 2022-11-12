import React from "react";
import { Link } from "react-router-dom";
import aboutUs from "../images/ian.jpg";
import "../styles/Story.css";

const StoryPage = () => {
  return (
    <section className="storyBar">
      <div className="storyHead">
        <h1>Every idea needs Medium</h1>
      </div>

      <div className="writeAbout">
        <p>
          The best ideas can change who we are. Medium is where those ideas take
          shape, take off, and spark powerful conversations. We’re an open
          platform where over 100 million readers come to find insightful and
          dynamic thinking. Here, expert and undiscovered voices alike dive into
          the heart of any topic and bring new ideas to the surface. Our purpose
          is to spread these ideas and deepen understanding of the world. We’re
          creating a new model for digital publishing. One that supports nuance,
          complexity, and vital storytelling without giving in to the incentives
          of advertising. It’s an environment that’s open to everyone but
          promotes substance and authenticity. And it’s where deeper connections
          forged between readers and writers can lead to discovery and growth.
          Together with millions of collaborators, we’re building a trusted and
          vibrant ecosystem fueled by important ideas and the people who think
          about them.
        </p>

        <img src={aboutUs} alt="Team" />
      </div>

      <div className="writeStory">
        <h1>Create the space for your thinking to take off.</h1>

        <p>
          A blank page is also a door. At Medium you can walk through it. It's
          easy and free to share your thinking on any topic, connect with an
          audience, express yourself with a range of publishing tools, and even
          earn money for your work.
        </p>

        <Link to="/write">
          <button>Write on WriteIt</button>
        </Link>
      </div>

      <div className="WriteUs">
        <Link to="/">
          <h1>
            Write
            <span>It</span>
          </h1>
        </Link>
      </div>
    </section>
  );
};

export default StoryPage;
