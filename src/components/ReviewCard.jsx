const ReviewCard = ({ imageSrc, name, country, role, review, flagSrc }) => {
    return (
      <div className="w-80 h-[420px] bg-white rounded-xl shadow-md flex flex-col items-center justify-between p-4">
        <img
          src={imageSrc}
          alt={name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <h3 className="text-xl font-semibold mt-4">{name}</h3>
        <div className="flex items-center gap-2">
          <img src={flagSrc} alt={`${country} flag`} className="w-6 h-6" />
          <p className="text-sm text-gray-500">{country}</p>
        </div>
        <p className="text-blue-900 text-center text-sm mt-2">{role}</p>
        <p className="text-black text-sm text-center mt-4">{review}</p>
      </div>
    );
  };
  
  export default ReviewCard;
  