import usr from ".././../Spots/SpotDetails/img/usr.png";
import "./SpotReviews.css";

export default function SpotReviews({ allReviews }) {
  if (!allReviews) return null;

  const reviews = Object.values(allReviews);

  return (
    <div>
      <ul>
        {reviews.map((review) => {
          return (
            <div className="container" key={review.id}>
              <div className="pfp">
                <img src={usr} className='pf' />
              </div>
              <h3 className="review-user">{review.User.firstName}</h3>
              <div className='desc'>{review.review}</div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
