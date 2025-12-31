import React from 'react';
import StatusRow from './ui/StatusRow';
import { systemStatus } from '../../data/admin';

const SystemStatusSection = () => {
    return (
        <div className="bg-[#111319] rounded-xl p-6 shadow-lg border border-[#1a1d24]">
            <h3 className="text-white font-bold mb-6">System Status</h3>
            <div className="space-y-6">
                {systemStatus.map((status) => (
                    <StatusRow
                        key={status.id}
                        label={status.label}
                        value={status.value}
                        status={status.status}
                        statusColor={status.statusColor}
                    />
                ))}
            </div>
        </div>
    );
};

export default SystemStatusSection;
