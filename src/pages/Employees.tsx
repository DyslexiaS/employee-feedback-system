import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { employees } from '../lib/api';
import Button from '../components/ui/Button';
import { getInitials } from '../lib/utils';

function Employees() {
  const { data: employeesData, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: employees.getAll
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <Button>
          Add Employee
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {employeesData?.map((employee) => (
          <div
            key={employee.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {getInitials(employee.name)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {employee.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {employee.department}
                </p>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                View Profile
              </Button>
              <Button
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Employees;