import { Section1, Section2, Section3 } from "./components";

export default function Landing1(props) {
  return (
    <div className='app landing1' id="scrool">
      <div className='app '>
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </div>
  );
};