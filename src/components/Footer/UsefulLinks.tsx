import UnderlineButton from "../UnderlineButton";

const UsefulLinks = () => {
  return (
    <div className="flex">
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-bold text-greenPrimary underline">
          Useful Links
        </h3>
        <ul>
          <li>
            <UnderlineButton to="/event-cancellation">
              Cancellation & Refund Policy
            </UnderlineButton>
          </li>

          <li>
            <UnderlineButton to="/hike-preparation">
              Hike preparation{" "}
            </UnderlineButton>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UsefulLinks;
