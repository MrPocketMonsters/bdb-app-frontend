import React from 'react';

export interface ListCardEntryProps {
  id: string;
  title?: string;
  image?: string;
  description?: string;
  date?: Date | string;
  onClick?: (id: string) => void;
}

const ListEntryCard: React.FC<ListCardEntryProps> = ({
  id,
  title,
  image,
  description,
  date,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const formatDate = (dateValue: Date | string) => {
    if (!dateValue) return '';
    const dateObj = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    return dateObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <button
      id={id}
      onClick={handleClick}
      className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 grid md:grid-cols-3 gap-6 items-center text-left hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
    >
      {image && (
        <div className="md:col-span-1">
          <img
            src={image}
            alt={title || 'Module image'}
            loading="lazy"
            className="w-full h-48 md:h-40 object-cover rounded-md border border-white/5 shadow-sm"
          />
        </div>
      )}
      <div className={image ? "md:col-span-2" : "md:col-span-3"}>
        {date && (
          <p className="text-sm text-white/60 mb-2">
            {formatDate(date)}
          </p>
        )}
        {title && (
          <h3 className="text-2xl font-semibold mb-3">{title}</h3>
        )}
        {description && (
          <p className="text-white/90 leading-relaxed">{description}</p>
        )}
      </div>
    </button>
  );
};

export default ListEntryCard;
