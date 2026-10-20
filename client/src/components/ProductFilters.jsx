import React from 'react';

export default function ProductFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filters-panel">
      <div className="filter-group">
        <label>Статус:</label>
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="все">Все</option>
          <option value="активен">Активен</option>
          <option value="на паузе">На паузе</option>
          <option value="в архиве">В архиве</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Категория:</label>
        <select name="category" value={filters.category} onChange={handleChange}>
          <option value="все">Все</option>
          <option value="Электроника">Электроника</option>
          <option value="Одежда">Одежда</option>
          <option value="Дом и сад">Дом и сад</option>
          <option value="Продукты">Продукты</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Сортировка:</label>
        <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
          <option value="dateDesc">Сначала новые</option>
          <option value="dateAsc">Сначала старые</option>
          <option value="title">По названию (А-Я)</option>
          <option value="priceDesc">По цене (дороже)</option>
          <option value="priceAsc">По цене (дешевле)</option>
        </select>
      </div>
    </div>
  );
}