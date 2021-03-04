import { Listbox, ListboxOption } from '@reach/listbox'
import '@reach/listbox/styles.css'

const coinsLimits = [2, 10, 50]

function CoinsLimitSelector(props: {
  limit: number
  onChange: (value: number) => void
}) {
  const { limit, onChange } = props

  return (
    <Listbox
      value={limit.toString()}
      onChange={(newValue) => onChange(parseInt(newValue))}
    >
      {coinsLimits.map((option) => {
        return (
          <ListboxOption key={option} value={option.toString()}>
            {option.toString()}
          </ListboxOption>
        )
      })}
    </Listbox>
  )
}

export { CoinsLimitSelector, coinsLimits }
