import { Navbar } from "components/navbar/navbar";
import Section1 from "./components/section1";
import Section2 from "./components/section2";
import Section3 from "./components/section3";
import Section4 from "./components/section4";
import Section5 from "./components/section5";

const sections = [Section1, Section2, Section3, Section4, Section5];

export default function Landing2() {
  return (
    <>
      <Navbar />
      <div className="app landing2" id="scroll">
        <div className="app">
          {sections.map((Section, index) => (
            <Section key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
("");
