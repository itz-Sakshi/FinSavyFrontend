const TrendCard = ({title, img}) => {
  return ( 
    <>
    <div
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow w-90 h-[400px] hover:opacity-80 cursor-pointer justify-center" // Fixed width and height for consistent size
    >
      <img
        className="object-contain w-full h-[70%] rounded-t-lg" // Fixed image height
        src={img}
        alt={title}
      />
      <div className="flex flex-col justify-between p-1 overflow-hidden">
        {/* Title with line clamp */}
        <h5 className="text-3xl font-bold tracking-tight text-gray-900 line-clamp-2">
          {title}
        </h5>
      </div>
    </div>
    </> )
};

export default TrendCard;