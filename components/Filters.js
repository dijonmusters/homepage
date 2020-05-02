import styled from 'styled-components'
import { useTodos } from '../context/Todos'
import useGradient from '../hooks/useGradient'

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
    props.isSelected
      ? `solid 2px rgb(${props.color})`
      : 'solid 2px transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;

  &:hover {
    border-bottom: solid 2px ${({ color }) => `rgb(${color})`};
  }
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
  const { middle } = useGradient()

  const changeFilter = filter => () =>
    filter !== currentFilter && setCurrentFilter(filter)

  return (
    <FilterContainer>
      {filters.map((filter, i) => (
        <Filter
          key={filter}
          isSelected={currentFilter === filter}
          onClick={changeFilter(filter)}
          color={middle}
        >
          {filter}
          {i < filters.length - 1 && <Divider />}
        </Filter>
      ))}
    </FilterContainer>
  )
}

export default Filters
