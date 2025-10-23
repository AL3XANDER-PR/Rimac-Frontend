import "./SkeletonPLans.scss";

export const SkeletonPlans = () => {
  return (
    <div className="skeleton-plans">
      {[1, 2, 3].map((index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-card__header">
            <div className="skeleton-card__info">
              <div className="skeleton-line w32 h6" />
              <div className="skeleton-line w24 h3" />
              <div className="skeleton-line w20 h3" />
              <div className="skeleton-line w28 h5" />
            </div>
            <div className="skeleton-avatar" />
          </div>

          <div className="skeleton-divider" />

          <ul className="skeleton-list">
            <li className="skeleton-line w3_4 h5" />
            <li className="skeleton-line w5_6 h5" />
            <li className="skeleton-line w4_5 h5" />
          </ul>

          <div className="skeleton-button" />
        </div>
      ))}
    </div>
  );
};
