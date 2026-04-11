import React from 'react';

interface MainImage {
  url_570xN: string;
}

export interface Item {
  listing_id: number;
  state: string;
  url?: string;
  title?: string;
  currency_code?: string;
  price?: string;
  quantity?: number;
  MainImage?: MainImage;
  is_digital?: boolean;
}

interface ListingProps {
  items: Item[];
}

const formatTitle = (title?: string): string => {
  if (!title) return '';
  return title.length > 50 ? `${title.slice(0, 50)}…` : title;
};

const formatPrice = (currency?: string, price?: string): string => {
  if (!currency || !price) return '';
  switch (currency) {
    case 'USD':
      return `$${price}`;
    case 'EUR':
      return `€${price}`;
    case 'GBP':
      return `£${price}`;
    default:
      return `${currency} ${price}`;
  }
};

const getStockClass = (quantity?: number): string => {
  if (quantity === undefined) return '';
  if (quantity <= 10) return 'stock-low';
  if (quantity <= 20) return 'stock-medium';
  return 'stock-high';
};

const Listing: React.FC<ListingProps> = ({ items = [] }) => {
  return (
    <div className="product-grid">
      {items.map((item) => {
        // Пропускаем удаленные товары или те, у которых нет картинки
        if (item.state === 'removed' || !item.MainImage) return null;

        return (
          <div className="product-card" key={item.listing_id}>
            {item.is_digital && <span className="digital-badge">Digital</span>}
            
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img 
                src={item.MainImage.url_570xN} 
                alt={item.title || 'Product image'} 
                className="product-image" 
              />
            </a>
            
            <div className="product-info">
              <h3 className="product-title">{formatTitle(item.title)}</h3>
              <div className="price-container">
                <div className="product-price">
                  {formatPrice(item.currency_code, item.price)}
                </div>
                <span className={`stock-badge ${getStockClass(item.quantity)}`}>
                  {item.quantity} left
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Listing;