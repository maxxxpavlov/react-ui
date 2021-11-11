import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ValueLink } from "../coreTypings";
import { IOpenAPIDictionaryElement } from "../typings";

export function MultipleSelect(props: {
  children: string;
  dictionary: IOpenAPIDictionaryElement[];
  valueLink: ValueLink;
}) {
  return (
    <FormControl sx={{ m: 1, width: 200 }}>
      <InputLabel>{props.children}</InputLabel>
      <Select
        onChange={(event) => props.valueLink.requestChange(event.target.value)}
        value={props.valueLink.value}
        multiple
      >
        {props.dictionary.map((element) => (
          <MenuItem key={element.id} value={element.id}>
            {/* <Avatar alt={element.title} src={element.image!} /> */}
            {element.title} {/* TODO: выводить cnt */}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
