import { useState } from "react";

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex ">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`text-gray-600 py-2 px-4 border-b-2 transition-colors duration-200 ${
              activeIndex === index
                ? "border-primary text-blue-500"
                : "border-transparent "
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">{tabs[activeIndex].content}</div>
    </div>
  );
};

export default Tabs;
