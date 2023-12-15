import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faTimes } from '@fortawesome/free-solid-svg-icons';

const Catagories = () => {
  const [searchValue, setSearchValue] = useState('');
  const [inputs, setInputs] = useState([]);

  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleSort = () => {
    if (dragIndex !== null && dragOverIndex !== null) {
      const updatedInputs = [...inputs];
      const draggedInput = updatedInputs[dragIndex];

      updatedInputs.splice(dragIndex, 1);

      updatedInputs.splice(dragOverIndex, 0, draggedInput);

      setInputs(updatedInputs);
      setDragIndex(null);
      setDragOverIndex(null);
    }
  };

  const handleDelete = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter' && searchValue.trim() !== '') {
      try {
        const response = await fetch('http://localhost:8080/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ value: searchValue }),
        });

        if (response.ok) {
          const newCategory = await response.json();
          setInputs((prevInputs) => [...prevInputs, newCategory]);
          setSearchValue('');
        } else {
          console.error('Failed to add category');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div>
        <FontAwesomeIcon icon={faSort} /> Questions
        <div>
          <input
            type="text"
            placeholder="Description (Optional)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border border-black w-2/4 h-12 text-center mt-5"
          />
        </div>
        <div>
          {inputs.map((input, index) => (
            <div
              key={input.id}
              className="relative flex p-3"
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragEnter={() => setDragOverIndex(index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="relative flex space-x-3 bg-gray-100 border rounded p-2 m-2">
                <FontAwesomeIcon className='mt-1' icon={faSort} />
                <p>{input.value}</p>
              </div>
              <button
                className=" p-2 rounded"
                onClick={() => handleDelete(index)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catagories;
