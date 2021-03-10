import "../stylesheets/layout/_filters.scss";
const FilterByLocation = (props) => {
  console.log(props.locationList);
  const handleChange = (e) => {
    props.handleFilter({
        key: 'location',
        value: e.target.value
    })  
  };
  const locationCheckbox = props.locationList.map((location, i) => {
    return (
      <label className="locations" key={i}>
        {location}  
        <input
          name="location"
          type="checkbox"
          value={location}
          onChange={handleChange}
        />
      </label>
    );
  });
  return (
    <div>
      <label>Locations</label>
      <br/>
      {locationCheckbox}
    </div>
  );
};
export default FilterByLocation;
