const AboutUs = () => {
  return (
    <section>
      <div>
        <div className="">
          <h1 className="mb-6 text-center text-xl font-bold md:text-3xl">
            Welcome to Tumaini Fitness Adventures
          </h1>

          <p className="mb-6 text-sm md:text-lg">
            Are you looking for a Fitness Adventurers’ package to spice up your
            fitness regimen?
            <span className="font-semibold text-greenPrimary">
              We are here to help you up your fitness goal while exploring the
              planet.
            </span>
          </p>

          <h2 className="mb-4 text-2xl font-semibold text-greenPrimary">
            About Us
          </h2>
          <p className="mb-6 text-sm md:text-lg">
            We are a fitness adventurers service firm based in Nairobi, Kenya.
            We offer a wide range of indoor and outdoor fitness activities such
            as:
          </p>

          <ul className="mb-6 list-inside list-disc text-sm md:text-lg">
            <li>
              <span className="font-semibold text-greenPrimary">
                Nature hikes
              </span>
            </li>
            <li>
              <span className="font-semibold text-greenPrimary">
                Adventurer’s tours
              </span>
            </li>
            <li>
              <span className="font-semibold text-greenPrimary">
                Team Building
              </span>
            </li>
            <li>
              <span className="font-semibold text-greenPrimary">
                Bike rides trips
              </span>
            </li>
            <li>
              <span className="font-semibold text-greenPrimary">
                Fitness boot camps
              </span>
            </li>
          </ul>

          <p className="mb-6 text-sm md:text-lg">
            Our activities cater to all ages and are designed to strengthen
            relationships among team members. <br />
            <span className="font-semibold text-greenPrimary">
              Our activities induce fun and bonding moments that make the whole
              experience worthwhile.
            </span>
          </p>

          <p className="md:text-lg text-sm">
            Tumaini Fitness Adventure creates lasting, memorable social
            connections for life.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
