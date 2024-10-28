import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Safety = () => {
  return (
    <section>
      <div className="w-full">
        <h1 className="md:text-3xl text-xl font-bold text-greenPrimary">
          At the heart of our Hiking excursions
        </h1>

        <Accordion type="multiple" className="w-full text-start">
          <AccordionItem value="value 1">
            <AccordionTrigger>Paramedics on Board</AccordionTrigger>
            <AccordionContent>
              Hiking is a high-risk activity like most other sports. All our
              excursions have at least one skilled paramedic on board to take
              care of you in case of injury.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="value 2">
            <AccordionTrigger>7:1 ratio</AccordionTrigger>
            <AccordionContent>
              Getting lost is not funny; therefore, we do not negotiate on your
              safety on the trails. We engage sufficient local guides and
              support staff to ensure a 7:1 guide ratio.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="value 3">
            <AccordionTrigger>Skilled Team</AccordionTrigger>
            <AccordionContent>
              Team Outdoorer boasts thousands of hours spent in the great
              outdoors learning, practicing, and iterating the best formulas for
              safety and growth. Hiking is our business and we mean business..
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default Safety;
