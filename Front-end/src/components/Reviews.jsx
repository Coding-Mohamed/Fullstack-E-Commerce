/* eslint-disable react/prop-types */
const ReviewCard = ({ name, role, text, rating }) => {
  return (
    <div className="col-lg-4 col-md-6 mb-2">
      <div className="card text-center shadow p-3 mb-5 rounded" style={{ backgroundColor: "#492e87", color: "#fff", height: "auto" }}>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p className="card-subtitle mb-2 text-muted">{role}</p>
          <p className="card-text">{text}</p>
          <div className="mt-3" style={{ color: "#ffcc00" }}>
            {rating}
          </div>
        </div>
      </div>
    </div>
  );
};

const Reviews = () => {
  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "#37b5b6" }}>
      <div className="row justify-content-around mx-3">
        <ReviewCard name="John Doe" role="Verified Buyer" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et  aliqua." rating="⭐⭐⭐⭐⭐" />
        <ReviewCard name="Joakim Lindh" role="Verified Buyer" text="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." rating="⭐⭐⭐⭐⭐" />
        <ReviewCard name="Bob Johnson" role="Verified Buyer" text="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." rating="⭐⭐⭐⭐⭐" />
      </div>
    </div>
  );
};

export default Reviews;
