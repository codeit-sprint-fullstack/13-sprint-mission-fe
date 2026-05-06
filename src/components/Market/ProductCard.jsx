
import './ProductCard.css';

function ProductCard({ item }) {
  const displayImage = (item.images && item.images[0]) || item.image;
  const favoriteCount = item.favoriteCount || 0;

  return (
    <article className="product-card">
      <div className="card-image-wrapper">
        <img 
          src={displayImage || 'https://via.placeholder.com/300'} 
          alt={item.name} 
          className="card-image" 
        />
      </div>

      <div className="card-info">
        <h3 className="card-title">{item.name}</h3>
        <p className="card-price">{item.price.toLocaleString()}원</p>
        <div className="card-footer">
          <div className="card-likes">
            <span className="heart-icon">♡</span> 
            <span className="like-count">{favoriteCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;