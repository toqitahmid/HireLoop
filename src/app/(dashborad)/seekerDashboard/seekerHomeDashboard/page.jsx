import { requiredRole } from '@/app/lib/core/session';
import React from 'react';

const page = async() => {
    await requiredRole('seeker');
    return (
      <div>
        <h2 className="h-screen flex justify-center items-center text-4xl">
          Seeker dashboard
        </h2>
      </div>
    );
};

export default page;