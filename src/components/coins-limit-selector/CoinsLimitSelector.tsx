import { FormControl, FormHelperText, MenuItem, Select } from '@material-ui/core'

const coinsLimits = [2, 10, 50]

function CoinsLimitSelector(props: {
  limit: number
  onChange: (value: number) => void
}) {
  const { limit, onChange } = props

  return (
    <FormControl>
      <FormHelperText>Limit to</FormHelperText>
      <Select
        value={limit.toString()}
        onChange={(event) => onChange(parseInt(event.target.value as string))}
      >
        {coinsLimits.map((option) => {
          return (
            <MenuItem key={option} value={option.toString()}>
              {option.toString()}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export { CoinsLimitSelector, coinsLimits }
