
import React from "react";

interface Tool {
  name: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  category: string;
  hasImage?: boolean;
}

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-3 mb-2">
        {tool.hasImage ? (
          <div className={`w-12 h-12 flex items-center justify-center rounded-full ${tool.iconBg}`}>
            <span className={`font-bold text-lg ${tool.iconColor}`}>{tool.icon}</span>
          </div>
        ) : (
          <div className={`w-12 h-12 flex items-center justify-center rounded-full ${tool.iconBg}`}>
            <span className={`font-bold text-lg ${tool.iconColor}`}>{tool.icon}</span>
          </div>
        )}
        <div>
          <h3 className="font-bold">{tool.name}</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600">{tool.description}</p>
    </div>
  );
};

export default ToolCard;
