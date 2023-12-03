import React, { useState } from 'react';
import './PeopleList.css';
import Pagination from './Pagination';
import { initialData } from '../Data';

const PeopleList = () => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const itemsPerPage = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleDelete = (id) => {
    const updatedData = data.filter((person) => person.id !== id);
    setData(updatedData);
  };

  const filteredData = data.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayedData = filteredData.slice(startIndex, endIndex);

  const handleEdit = (id, field) => {
    const updatedData = data.map((person) => {
      if (person.id === id) {
        return { ...person, isEditing: true };
      } else {
        return person;
      }
    });
    setData(updatedData);
  };

  const handleDeleteSelected = () => {
    const updatedData = data.filter((person) => !selectedRows.includes(person.id));
    setData(updatedData);
    setSelectedRows([]);
  };

  const handleSaveEdit = (id) => {
    const updatedData = data.map((person) => {
      if (person.id === id) {
        return {
          ...person,
          isEditing: false,
        };
      } else {
        return person;
      }
    });
    setData(updatedData);
  };

  const handleInputChange = (id, field, value) => {
    const updatedData = data.map((person) => {
      if (person.id === id) {
        return {
          ...person,
          [field]: value,
        };
      } else {
        return person;
      }
    });
    setData(updatedData);
  };

  return (
    <div>
      <h1>People List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {selectedRows.length > 0 && (
        <button className="delete-selected" onClick={handleDeleteSelected}>
          <i className="fa fa-trash" /> Delete Selected
        </button>
      )}

      <table className="people-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((person) => (
            <tr key={person.id} className={person.isEditing ? 'editing' : ''}>
              <td >
                {person.isEditing ? (
                  <input
                    type="text"
                    value={person.name}
                    onChange={(e) =>
                      handleInputChange(person.id, 'name', e.target.value)
                    }
                  />
                ) : (
                  person.name
                )}
              </td>
              <td>
                {person.isEditing ? (
                  <input
                    type="text"
                    value={person.email}
                    onChange={(e) =>
                      handleInputChange(person.id, 'email', e.target.value)
                    }
                  />
                ) : (
                  person.email
                )}
              </td>
              <td>
                {person.isEditing ? (
                  <input
                    type="text"
                    value={person.role}
                    onChange={(e) =>
                      handleInputChange(person.id, 'role', e.target.value)
                    }
                  />
                ) : (
                  person.role
                )}
              </td>
              <td>
                {person.isEditing ? (
                  <button onClick={() => handleSaveEdit(person.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(person.id)}>Edit</button>
                )}
                <button onClick={() => handleDelete(person.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PeopleList;
