import { Navbar } from "components/navbar/navbar";
import Section1 from "./components/section1";
import Section2 from "./components/section2";
import Section3 from "./components/section3";
import Section4 from "./components/section4";
import Section5 from "./components/section5";
import Footer from "components/footer";
import DressCode from "./components/dressCode";
import Couple from "./components/couple";

const sections = [
  Section1,
  Section2,
  Couple,
  Section3,
  Section4,
  DressCode,
  Section5,
];

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
      <Footer />
    </>
  );
}
("");
