export const metadata = {
  title: 'About | Ankit Ramakrishnan'
};

export default function AboutPage() {
  return (
    <div className="shell">
      <article className="post-body">
        <h2>Welcome to my blog</h2>
        <div className="about-intro">
          <div className="speech-bubble">
            <p>
              Hi, I am Ankit Ramakrishnan. I build software systems, data visualizations, and the
              occasional overambitious research project.
            </p>
          </div>
          <div className="headshot">
            <img src="/profile.png" alt="Ankit Ramakrishnan headshot" />
          </div>
        </div>
        <p>
          I recently started my PhD and am a first-year student at the Network Science Institute.
          My interests span software system design, data analysis, computational social science,
          digital humanities, and art. This blog is my living notebook for projects and ideas
          across those domains. You can find my institute profile{' '}
          <a href="https://www.networkscienceinstitute.org/people/ankit-ramakrishnan">here</a>.
        </p>

        <h3>Professional journey</h3>
        <p>
          I earned a B.Tech in Computer Science and Engineering from Vellore Institute of
          Technology in India, then completed my Computer Science M.S. at Northeastern University
          with coursework spanning NLP, algorithms, HCI, and programming languages. I am now
          pursuing my PhD at the Network Science Institute, working under Dr. Matteo Chinazzi on
          large-scale location data for epidemiological modeling and analysis.
        </p>
        <p>
          I have worked as a Teaching Assistant at Northeastern University, supporting courses in
          NLP and algorithms. Prior to that, I was a Research Co-Op at the Network Science
          Institute, where I worked on COVID geospatial mobility data analysis using GCP and
          Hadoop. I also spent time at HSBC Technology as a Senior Software Engineer focused on
          platform architecture and DevOps tooling.
        </p>

        <h3>Projects and contributions</h3>
        <ul>
          <li>
            <strong>Slapscape</strong>: A full-stack geo-located image sharing social network
            application.
          </li>
          <li>
            <strong>TASTY</strong>: A transformer-based approach for predicting time and space
            complexity of code snippets (ICLR 2023 DL4C Workshop).
          </li>
          <li>
            <strong>Visualizing Crime Incident Reports in Boston</strong>: A visualization-driven
            analysis of crime data.
          </li>
          <li>
            <strong>Conversation Visualization</strong>: A D3 + C++ platform for mapping
            multi-participant video calls.
          </li>
        </ul>

        <p>
          This site used to run on fastpages. I am rebuilding it with Next.js to keep the workflow
          light while still supporting rich, media-heavy posts.
        </p>

        <p>
          Connect with me on <a href="https://www.linkedin.com/in/ankitramakrishnan/">LinkedIn</a>{' '}
          or explore code on <a href="https://github.com/TheChesireCat">GitHub</a>.
        </p>
        <p>
          Feedback is always welcome. Reach out at{' '}
          <a href="mailto:ramakrishnan.ank@northeastern.edu">ramakrishnan.ank@northeastern.edu</a>.
        </p>
      </article>
    </div>
  );
}
