export default function CancellationPolicy() {
  return (
    <div className=" mx-auto text-center">
      <h1 className="md:text-3xl text-xl font-bold mb-6 text-greenPrimary">
        Event Cancellation Policy
      </h1>
      <p className="text-lg mb-8">
        Understand our policies to help plan your adventure with confidence.
      </p>

      <div className="text-left bg-white text-gray-800 p-6 rounded-lg shadow-lg">
        {/* Cancellation by Participant */}
        <div className="space-y-3">
          <div>
            <h2 className="md:text-3xl sm:text-xl  font-semibold text-[#4CAF50] mb-4">
              1. Event Cancellation by Participant
            </h2>
            <ul className="space-y-4">
              <li className="text-sm md:text-base">
                <span className="font-semibold text-sm md:text-base">
                  Full Refund:
                </span>{" "}
                Full refund if cancellation occurs 7-14 days before the hike.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold text-sm md:text-base">
                  Partial Refund:
                </span>{" "}
                If canceled 2-6 days prior, a 50-75% refund may be offered
                depending on upfront costs.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold text-sm md:text-base">
                  No Refund:
                </span>{" "}
                No refund for cancellations within 24-48 hours of the hike due
                to upfront costs.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold text-sm md:text-base">
                  Rebooking Options:
                </span>{" "}
                In some cases, rescheduling may be available as an alternative
                to a refund.
              </li>
            </ul>
          </div>

          {/* Cancellation by Organizer */}
          <div>
            <h2 className="md:text-3xl sm:text-xl  font-semibold text-[#4CAF50] mb-4">
              2. Cancellation by Organizer
            </h2>
            <ul className="space-y-4">
              <li className="text-sm md:text-base">
                <span className="font-semibold">
                  Weather-Related Cancellations:
                </span>{" "}
                Full refund or rescheduling if canceled due to unsafe weather
                conditions.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold text-sm md:text-base">
                  Low Participation:
                </span>{" "}
                Full refund or rescheduling offered if minimum participant
                threshold isn’t met.
              </li>
              <li className="text-sm md:text-base">
                <span className="font-semibold ">Other Circumstances:</span>{" "}
                Refund or rescheduling offered for unforeseen cancellations
                (e.g., guide illness, natural disasters).
              </li>
            </ul>
          </div>

          {/* Transfer of Reservation */}
          <div>
            <h2 className="md:text-3xl sm:text-xl  font-semibold text-[#4CAF50] mb-4">
              3. Transfer of Reservation
            </h2>
            <p className=" text-sm md:text-base">
              The organizer allows transferring your slot to another person if
              you cannot attend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
