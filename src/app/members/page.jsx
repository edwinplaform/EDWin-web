'use client';

import { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [userType, setUserType] = useState('student'); 
  const [firstNameFilter, setFirstNameFilter] = useState('');
  const [lastNameFilter, setLastNameFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const users = [
    { type: 'student', firstName: 'Alice', lastName: 'Brown', email: 'alice@example.com', profilePic: '/profile.png' },
    { type: 'student', firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com', profilePic: 
      '/profile.png' },
    { type: 'tutor', firstName: 'Charlie', lastName: 'Davis', email: 'charlie@example.com', profilePic: '/profile.png' },
    { type: 'tutor', firstName: 'Diana', lastName: 'Evans', email: 'diana@example.com', profilePic: 
      '/profile.png' },
  ];

  useEffect(() => {
    const filtered = users.filter(user => {
      return (
        user.type === userType &&
        (firstNameFilter === '' || user.firstName.startsWith(firstNameFilter)) &&
        (lastNameFilter === '' || user.lastName.startsWith(lastNameFilter))
      );
    });
    setFilteredUsers(filtered);
  }, [userType, firstNameFilter, lastNameFilter]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-300 text-white py-4 px-6 flex justify-between">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </header>

      <main className="flex-grow p-6">
        <div className="mb-6 flex items-center gap-4">
          <select
            className="border p-2 rounded"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="student">Students</option>
            <option value="tutor">Tutors</option>
          </select>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Filter by First Name</h2>
          <div className="grid grid-cols-12 gap-2">
            {alphabet.map(letter => (
              <button
                key={letter}
                className={`p-2 border rounded text-center ${firstNameFilter === letter ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
                onClick={() => setFirstNameFilter(firstNameFilter === letter ? '' : letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Filter by Last Name</h2>
          <div className="grid grid-cols-12 gap-2">
            {alphabet.map(letter => (
              <button
                key={letter}
                className={`p-2 border rounded text-center ${lastNameFilter === letter ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
                onClick={() => setLastNameFilter(lastNameFilter === letter ? '' : letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
                    <img src={user.profilePic} alt="Profile" className="w-10 h-10 rounded-full" />
                    {user.firstName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center" colSpan="3">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 E-Tuition Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
