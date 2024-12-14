import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { reviews } from '../lib/api';
import { useAuthStore } from '../store/authStore';
import { formatDate } from '../lib/utils';

function Dashboard() {
  const user = useAuthStore(state => state.user);
  const isAdmin = useAuthStore(state => state.isAdmin);

  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: reviews.getAll
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome back, {user?.name}
        </h2>
        <p className="text-gray-600">
          {isAdmin() 
            ? "Here's an overview of all performance reviews"
            : "Here are your pending reviews"}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Reviews
        </h3>
        <div className="space-y-4">
          {reviewsData?.map((review) => (
            <div
              key={review.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Review for {review.employeeId}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Due: {formatDate(review.period)}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  review.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  review.status === 'SUBMITTED' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {review.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;