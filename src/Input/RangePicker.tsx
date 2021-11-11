import { Button, Popover } from "@mui/material";
import { ValueLink } from "../coreTypings";
import React from "react";
import { DateRangePicker, DateRange } from "materialui-daterange-picker";

/**
 * @description Выбор промежутка времни
 */

export function RangePicker(props: {
  children: string;
  minDate: string;
  maxDate: string;
  startDate: ValueLink;
  endDate: ValueLink;
}) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!open) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
    setOpen(!open);
  };
  const dateRange: DateRange = {
    startDate: props.startDate.value,
    endDate: props.endDate.value,
  };
  return (
    <div>
      <Button sx={{ m: 1, width: 200 }} onClick={toggle} variant="outlined">
        {props.children}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={toggle}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <DateRangePicker
          open={open}
          minDate={props.minDate}
          maxDate={props.maxDate}
          initialDateRange={dateRange}
          // @ts-ignore
          toggle={toggle}
          onChange={(range) => {
            props.startDate.requestChange(range.startDate);
            props.endDate.requestChange(range.endDate);
          }}
        />
      </Popover>
    </div>
  );
}
