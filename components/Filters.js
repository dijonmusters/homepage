import styled from 'styled-components'
import { useTodos } from '../context/Todos'

const FilterContainer = styled.div`
  display: flex;

  &:hover {
    cursor: pointer;
  }
`

const Filter = styled.span`
  position: relative;
  flex: 1;
  border-bottom: ${props =>
    props.isSelected ? 'solid 2px #4e54c8' : 'solid 2px transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
`

const Divider = styled.div`
  position: absolute;
  width: 1px;
  height: 1rem;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: #dfdfdf;
`

const Filters = ({ currentFilter, setCurrentFilter }) => {
  const { categories: filters } = useTodos()

  const changeFilter = filter => () =>
    filter !== currentFilter && setCurrentFilter(filter)

  return (
    <FilterContainer>
      {filters.map((filter, i) => (
        <Filter
          key={filter}
          isSelected={currentFilter === filter}
          onClick={changeFilter(filter)}
        >
          {filter}
          {i < filters.length - 1 && <Divider />}
        </Filter>
      ))}
    </FilterContainer>
  )
}

export default Filters
