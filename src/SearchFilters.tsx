import React from "react";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Criteria, IDictionary } from "./typings";
import { GetValueLink, GetValuelinkCheckbox } from "./coreTypings";
import { MultipleSelect } from "./Input/MultipleSelect";
import { RangePicker } from "./Input/RangePicker";
import { CheckboxGroup } from "./Input/CheckboxGroup";

/*
  This is component that combines inputs for search criteria (filters).
  This component I think is good but getValueLink should be removed
*/

//TODO: Remove getValueLink from components
export function SearchCriteria(props: {
  dictionaries: IDictionary;
  criteria: Criteria;
  setCriteria: React.Dispatch<React.SetStateAction<Criteria>>;
  runSearch: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const { dictionaries, criteria, setCriteria, runSearch } = props;
  const getValueLink: GetValueLink<Criteria> = (key: keyof Criteria) => {
    return {
      requestChange: (value: unknown) => {
        setCriteria({ ...criteria, [key]: value });
      },
      value: criteria[key],
    };
  };
  // Сделать функцию универсальной
  const getValueLinkCheckbox = (key: keyof Criteria): GetValuelinkCheckbox => {
    return (value: string) => {
      return {
        requestChange: (event: React.ChangeEvent<HTMLInputElement>) => {
          const { checked } = event.target;
          const updatedArray = (criteria[key] as string[]).filter(
            (v) => v !== value
          );
          if (checked) {
            updatedArray.push(value);
          }
          setCriteria({ ...criteria, [key]: updatedArray });
        },
        value: (criteria[key] as string[])?.indexOf(value) !== -1,
      };
    };
  };
  // Можно использовать общий style. Внести инпуты под общего родителя-компонента и избегать копирования
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid item xs={8}>
        <MultipleSelect
          dictionary={dictionaries.warehouseId.data!}
          valueLink={getValueLink("warehouseId")}
        >
          Warehouse
        </MultipleSelect>
      </Grid>
      <Grid item xs={8}>
        <MultipleSelect
          dictionary={dictionaries.productIds.data!}
          valueLink={getValueLink("productIds")}
        >
          Products
        </MultipleSelect>
      </Grid>
      <Grid item xs={8}>
        <MultipleSelect
          dictionary={dictionaries.depositorsAccountsIds.data!}
          valueLink={getValueLink("depositorsAccountsIds")}
        >
          Depositors
        </MultipleSelect>
      </Grid>
      <Grid item xs={8}>
        <RangePicker
          minDate={dictionaries.createdAt.min!}
          maxDate={dictionaries.createdAt.max!}
          startDate={getValueLink("createdAtStart")}
          endDate={getValueLink("createdAtEnd")}
        >
          Creation time
        </RangePicker>
      </Grid>
      <Grid item>
        <RangePicker
          minDate={dictionaries.modifiedAt.min!}
          maxDate={dictionaries.modifiedAt.max!}
          startDate={getValueLink("modifiedAtStart")}
          endDate={getValueLink("modifiedAtEnd")}
        >
          Modification time
        </RangePicker>
      </Grid>
      <Grid item>
        <RangePicker
          minDate={dictionaries.dateOrder.min!}
          maxDate={dictionaries.dateOrder.max!}
          startDate={getValueLink("dateOrderStart")}
          endDate={getValueLink("dateOrderEnd")}
        >
          Execution time
        </RangePicker>
      </Grid>
      <Grid item xs={8}>
        <CheckboxGroup
          dictionary={dictionaries.status.data!}
          getValueLinkCheckbox={getValueLinkCheckbox("status")}
        >
          Status
        </CheckboxGroup>
      </Grid>
      <Grid item xs={8}>
        <CheckboxGroup
          dictionary={dictionaries.type.data!}
          getValueLinkCheckbox={getValueLinkCheckbox("type")}
        >
          Type
        </CheckboxGroup>
      </Grid>
      {/* Думаю, выравнивание по центру можно сделать как-то проще. Но нет времени найти */}
      <Grid item xs={8} alignItems="center">
        <Button variant="contained" href="#" onClick={runSearch}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
