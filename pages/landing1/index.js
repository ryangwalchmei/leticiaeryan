import Section1 from "./components/section1";
import Section2 from "./components/section2";
import Section3 from "./components/section3";

export default function Landing1(props) {
  return (
    <div className="app landing1" id="scrool">
      <div className="app ">
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </div>
  );
}
