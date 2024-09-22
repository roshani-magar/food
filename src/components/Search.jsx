import React from 'react';
import Binarysearch from './binarysearch';
import CharacterSearch from './characterSearch';

const Search = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="container mx-auto max-w-5xl bg-white shadow-lg rounded-lg p-8">
        {/* Binary Search Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-[#F37116] mb-8 text-center">Binary Search</h1>
          <div className="border-t-4 border-[#F37116] pt-8">
            <Binarysearch />
          </div>
        </div>

        {/* Character Search Section */}
        <div>
          <h1 className="text-4xl font-extrabold text-[#F37116] mb-8 text-center">Character Search</h1>
          <div className="border-t-4 border-[#F37116] pt-8">
            <CharacterSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
