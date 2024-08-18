// Card Component
export const Card = ({ children }) => {
  return <div className="border border-black bg-[#e0d4ff] h-full ">{children}</div>;
};

// CardHeader Component
export const CardHeader = ({ children }) => {
  return <div className="pb-4 mb-4 ">{children}</div>;
};

// CardTitle Component
export const CardTitle = ({ children, className }) => {
  return <h2 className="text-lg font-bold text-black">{children}</h2>;
};

// CardContent Component
export const CardContent = ({ children }) => {
  return <div className="text-gray-700">{children}</div>;
};
