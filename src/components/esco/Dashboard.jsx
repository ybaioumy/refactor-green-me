import React from 'react'

function ESCODashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {/* Left Section: Charts and Sustainability ESCODashboard */}
      <div className="col-span-12 md:col-span-7 lg:col-span-8 space-y-4">
        {/* Chart 1 */}
        <div className="bg-white shadow p-4 rounded-lg">
          {/* Line chart component */}
        </div>

        {/* Portfolio section with donut charts */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">{/* Donut chart 1 */}</div>
          <div className="col-span-6">{/* Donut chart 2 */}</div>
        </div>

        {/* Sustainability Dash */}
        <div className="bg-gray-300 shadow p-4 rounded-lg">
          {/* Sustainability ESCODashboard component */}
        </div>
      </div>

      {/* Right Section: Pipeline, Opportunities, O&M Center */}
      <div className="col-span-12 md:col-span-5 lg:col-span-4 space-y-4">
        {/* Projects Pipeline */}
        <div className="bg-gray-400 shadow p-4 rounded-lg">
          {/* Projects pipeline component */}
        </div>

        {/* Opportunities section */}
        <div className="bg-gray-500 shadow p-4 rounded-lg">
          {/* Opportunities component */}
        </div>

        {/* O&M Center section */}
        <div className="bg-white shadow p-4 rounded-lg">
          {/* O&M center component */}
        </div>
      </div>
    </div>
  );
}

export default ESCODashboard