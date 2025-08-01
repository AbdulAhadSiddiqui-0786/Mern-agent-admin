import React from "react";

// Component to display assigned tasks grouped by agent
export default function DistributedList({ agents }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {agents.map(({ agentId, data }, index) => (
        <div key={index} className="p-4 shadow rounded">
          <h3 className="text-lg font-bold mb-2">
            {agentId?.name} ({agentId?.email})
          </h3>

          {data.length === 0 ? (
            <p className="text-gray-500">No tasks assigned yet.</p>
          ) : (
            <ul className="space-y-2">
              {data.map((item, idx) => (
                <li key={idx} className="p-2 rounded bg-white dark:bg-gray-800">
                  <p>
                    <strong>Name:</strong> {item.firstName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {item.phone}
                  </p>
                  <p>
                    <strong>Notes:</strong> {item.notes}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
