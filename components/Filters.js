import styled from 'styled-components'

const FilterContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
`

const Filter = styled.span`
  padding: 0 2rem;
  text-decoration: ${props => props.isSelected && 'underline'};
  border-right: 1px solid white;

  &:last-child {
    border-right: none;
  }

  &:hover {
    cursor: pointer;
  }
`

const Filters = ({ filters, selected, setSelected }) => {
  const changeFilter = newSelected => e =>
    newSelected !== selected && setSelected(newSelected)

  return (
    <FilterContainer>
      {filters.map(f => (
        <Filter key={f} isSelected={selected === f} onClick={changeFilter(f)}>
          {f}
        </Filter>
      ))}
    </FilterContainer>
  )
}

export default Filters
