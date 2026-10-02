import { Link } from "react-router-dom";
import "./OfferCards.css";

import offer1 from "../../assets/card1.png";
import offer2 from "../../assets/card2.png";

const offers = [
  {
    id: 1,
    discount: "30%",
    title: "Elegant Farshi Salwar Suits",
    subtitle: "Premium styles for every occasion",
    image: offer1,
    link: "/shop",
  },
  {
    id: 2,
    discount: "40%",
    title: "Festive Farshi Collection",
    subtitle: "Traditional elegance with a modern touch",
    image: offer2,
    link: "/shop",
  },
];

const OfferCards = () => {
  return (
    <section className="offer-section">
      <div className="offer-container">
        {offers.map((offer) => (
          <div className="offer-card" key={offer.id}>
            <div className="offer-content">
              <span className="offer-small">UP TO</span>

              <h2>{offer.discount}</h2>

              <h3>{offer.title}</h3>

              <p>{offer.subtitle}</p>

              <Link to={offer.link} className="offer-btn">
                Shop Now
              </Link>
            </div>

            <div className="offer-image">
              <img src={offer.image} alt={offer.title} />
            </div>

            <div className="offer-circle top"></div>
            <div className="offer-circle bottom"></div>

            <div className="offer-badge">%</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfferCards;