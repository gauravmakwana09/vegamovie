import React from 'react';

const StatusRow = ({ label, value, status, statusColor }) => {
    return (
        <div className="mb-6 last:mb-0">
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 font-medium text-sm">{label}: {value}% ({status})</span>
                <span className={`text-sm font-bold ${statusColor}`}>{value}% ({status})</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-red-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${value}%` }}
                ></div>
            </div>
        </div>
    );
};

export default StatusRow;
