// import styles from "./page.module.css";
import SubjectsLinks from "./components/subjectLinks"
import Title from "./components/title";

export default function Home() {

  return (
    <>
      <section>
        <Title title_part1="Welcome to the" title_part2="Frontend Quiz!"/>
        <p className="italic_text_home">Pick a subject to get started.</p>
      </section>
      <article>
        <SubjectsLinks/>
      </article>
    </>
  );
}
