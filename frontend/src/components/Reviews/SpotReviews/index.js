export default function SpotReviews({ allReviews }) {
  if (!allReviews) return null;

  const reviews = Object.values(allReviews);
  console.log("hi", allReviews);

  return (
    <div>
      <ul>
        {reviews.map((review) => {
          return (
            <div className="container" key={review.id}>
              <div className="pfp"></div>
              <span className="review-user">{review.User.firstName}</span>
              <div>{review.review}</div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
