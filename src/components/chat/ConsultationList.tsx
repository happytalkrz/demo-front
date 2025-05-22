interface ConsultationItem {
  service: string;
  date: string;
  time: string;
  counselor: string;
}

interface ConsultationListProps {
  items: ConsultationItem[];
  title: string;
}

const ConsultationList = ({ items, title }: ConsultationListProps) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs mr-2">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.service}</p>
                <div className="flex text-xs text-gray-500">
                  <span className="mr-2">{item.date}</span>
                  <span className="mr-2">{item.time}</span>
                  <span>{item.counselor}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultationList; 