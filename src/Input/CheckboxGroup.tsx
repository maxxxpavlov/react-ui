import {
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { GetValuelinkCheckbox } from "../coreTypings";
import { IOpenAPIDictionaryElement } from "../typings";

export function CheckboxGroup(props: {
  children: string;
  dictionary: IOpenAPIDictionaryElement[];
  getValueLinkCheckbox: GetValuelinkCheckbox;
}) {
  return (
    <FormControl>
      <FormLabel component="legend">{props.children}</FormLabel>
      <FormGroup>
        {props.dictionary?.map((statusElement) => (
          <FormControlLabel
            control={
              <Checkbox
                key={statusElement.id}
                checked={props.getValueLinkCheckbox(statusElement.code!).value}
                onChange={
                  props.getValueLinkCheckbox(statusElement.code!).requestChange
                }
              />
            }
            label={statusElement.code}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
