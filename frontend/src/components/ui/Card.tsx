// Card Component

export const Card = ({ children }) => {
  return (
    <div 
      className="card bg-background-4">{children}
    </div>
  );
};

// CardHeader Component
export const CardHeader = ({ children }) => {
  return <div className="card-header mb-4 ">{children}</div>;
};

// CardTitle Component
export const CardTitle = ({ children, className }) => {
  return <h2 className="text-xl font-bold text-black">{children}</h2>;
};

// CardContent Component
export const CardContent = ({ children }) => {
  return <div className="card-content text-1">{children}</div>;
};
