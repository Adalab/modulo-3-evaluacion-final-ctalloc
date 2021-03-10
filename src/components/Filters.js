import FilterByName from './FilterByName';
import FilterBySpecies from './FilterBySpecies';
import FilterByLocation from './FilterByLocation';
import "../stylesheets/layout/_filters.scss";

const Filters = props =>{
    return (
      <section className='filters'>
      <form className='filters__form'>
        <FilterByName handleFilter = {props.handleFilter}/>
        <FilterBySpecies handleFilter = {props.handleFilter}/>
        <FilterByLocation handleFilter = {props.handleFilter} locationList={props.locationList}/>
      </form>
    </section>
    )
  }
  export default Filters;