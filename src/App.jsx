/**
 * 
 * Description: Create a search component to filter a list of mock user data based on input text.
Requirements:
An input field for entering a search query.
Filter buttons for selecting "user name" or "address" as the search field:
When "user name" is selected, search only in the user names.
When "address" is selected, search only in the addresses.
If neither option is selected, apply the search to both user names and addresses.
Display a list of user data that matches the query.
Show a message such
 */
import { useEffect } from "react";
import { useState } from "react";
const data = [
  { id: 1, name: "Aarav Sharma", address: "12 MG Road, Bengaluru" },
  { id: 2, name: "Anika Verma", address: "22 Nehru Nagar, Mumbai" },
  { id: 3, name: "Kabir Singh", address: "45 Park Street, Delhi" },
  { id: 4, name: "Maya Iyer", address: "34 Mount Road, Chennai" },
  { id: 5, name: "Arjun Patel", address: "56 Ashram Road, Ahmedabad" },
  { id: 6, name: "Lakshmi Rao", address: "78 Residency Road, Hyderabad" },
  { id: 7, name: "Ravi Kumar", address: "89 Jayanagar, Bengaluru" },
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState({
    name: false,
    address: false,
  });
  const [filteredData, setFilteredData] = useState(data);

  const handleSearchQuery = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSelectedFilter((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  useEffect(() => {
    let filteredData = data;
    if (selectedFilter.name) {
      filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (selectedFilter.address) {
      filteredData = data.filter((item) =>
        item.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      filteredData = data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filteredData);
  }, [searchQuery, selectedFilter]);

  return (
    <>
      <div>
        <input
          type="text"
          name="search"
          value={searchQuery || ""}
          onChange={(e) => handleSearchQuery(e)}
        />

        <input
          type="checkbox"
          onChange={handleChange}
          name="name"
          checked={selectedFilter.name}
        />
        <label>name</label>
        <input
          type="checkbox"
          onChange={handleChange}
          checked={selectedFilter.address}
          name="address"
        />
        <label>address</label>
      </div>
      <ul>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <li key={item.id}>
              {item.name} - {item.address}
            </li>
          ))
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </>
  );
}

export default App;
