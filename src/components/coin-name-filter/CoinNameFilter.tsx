import { FormControl, FormHelperText, TextField } from '@material-ui/core'

function CoinNameFilter(props: {
  value: string
  onChange: (value: string) => void
}) {
  const { value, onChange } = props

  return (
    <>
      <FormControl>
        <FormHelperText>Filter by name</FormHelperText>
        <TextField
          value={value}
          onChange={(event) => onChange(event.target.value)}
        ></TextField>
      </FormControl>
    </>
  )
}

export { CoinNameFilter }
