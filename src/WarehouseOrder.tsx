import {
  Snackbar,
  Divider,
  Typography,
  Paper,
  Grid,
  Tooltip,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import {
  WarehouseOrder,
  IDictionary,
  IOpenAPIDictionaryElement,
  Address,
  ShipContact,
} from "./typings";
import React from "react";
import Moment from "moment";

const Img = styled("img")({
  margin: "auto",
  display: "inline-block",
  maxWidth: "30px",
  maxHeight: "70px",
});

export function ProductItem({
  product,
}: {
  product: IOpenAPIDictionaryElement;
}) {
  return (
    <Box
      sx={{
        p: 0,
        margin: "none",
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Img src={product.image} alt={product.title}></Img>
      <Typography sx={{ display: "inline" }} /* выровнять */ variant="body2">
        {product.title}
      </Typography>
    </Box>
  );
}

export function Depositor({
  depositor,
}: {
  depositor: IOpenAPIDictionaryElement;
}) {
  return (
    <Grid container xs={10} sm justifyContent="space-evenly">
      <Grid item sm>
        <Typography variant="body2">{depositor.title}</Typography>
      </Grid>
    </Grid>
  );
}

export function CopyableValue({
  children,
  label,
}: {
  children: string;
  label: string;
}) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const copy = () => {
    navigator.clipboard.writeText(children).then(() => setOpen(true));
  };
  return (
    <Box>
      <Typography variant="body2">
        {label}:{" "}
        <Tooltip title="Click to copy">
          <Typography
            onClick={copy}
            sx={{ display: "inline", cursor: "pointer" }}
            variant="caption"
          >
            {children}
          </Typography>
        </Tooltip>
      </Typography>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Text copied to clipboard"
      />
    </Box>
  );
}
export function AddressItem({ address }: { address: Address }) {
  // TODO: look for address convention
  return (
    <React.Fragment>
      {address.country} {address.state} {address.postalCode} {address.city}{" "}
      {address.streetLine1}
    </React.Fragment>
  );
}
export function ContactItem({ contact }: { contact: ShipContact }) {
  // TODO: look for contact convention
  return (
    <React.Fragment>
      {contact.name} {contact.email} {contact.phone} {contact.company}
    </React.Fragment>
  );
}
export function WarehouseOrderItem({
  dictionaries,
  order,
}: {
  dictionaries: IDictionary;
  order: WarehouseOrder;
}) {
  const warehouse = dictionaries.warehouseId.data?.find(
    (v) => v.id === order.warehouseId
  );
  const depositors = order.depositorsAccountsIds?.map((depositorId) =>
    dictionaries.depositorsAccountsIds?.data?.find((v) => v.id === depositorId)
  ); //TODO: to dry
  const products = order.productIds?.map((productId) =>
    dictionaries.productIds?.data?.find((v) => v.id === productId)
  );

  // TODO: Divide component
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 700,
        marginTop: 2,
        alignItems: "center",
      }}
    >
      <Typography display="inline">
        {order.type.charAt(0)}
        {order.type?.slice(1).toLowerCase()} at {warehouse?.title}
      </Typography>{" "}
      {/* Выровнять */}
      <Box
        sx={{
          backgroundColor: "#bdbdbd",
          borderRadius: "5px",
          maxWidth: "fit-content",
          p: 0.5,
          display: "inline",
          float: "right",
        }}
      >
        <Typography align="right" display="inline" variant="subtitle2">
          {order.status}
        </Typography>
      </Box>
      <Divider sx={{ marginTop: 2 }} />
      <Grid container spacing={2}>
        <Grid sm={5} item>
          <CopyableValue label="Code">{order.code}</CopyableValue>
          <CopyableValue label="References">
            {order.references.join(", ") || "empty"}
          </CopyableValue>
          {order.statusesExtended && (
            <CopyableValue label="Extended status">
              {order.statusesExtended}
            </CopyableValue>
          )}
          <CopyableValue label="Date">
            {Moment(order.date).format("d MMMM YYYY h:mma")}
          </CopyableValue>
          <CopyableValue label="Last modified">
            {Moment(order.modifiedAt).format("d MMMM YYYY h:mma")}
          </CopyableValue>
          <CopyableValue label="Created at">
            {Moment(order.createdAt).format("d MMMM YYYY h:mma")}
          </CopyableValue>
          <CopyableValue label="Notes">{order.notes || "empty"}</CopyableValue>
        </Grid>

        <Grid item sm={3}>
          <Typography>Depositors</Typography>
          {depositors
            ?.filter((v) => v)
            .map((depositor) => (
              <Depositor depositor={depositor!}></Depositor>
            ))}
          {/* Предположу, что либо получатель, либо отправитель */}
          <Typography>
            {order.recipientAddress ? "Recipient address" : "Shipper address"}
          </Typography>
          <AddressItem
            address={
              order.recipientAddress
                ? order.recipientAddress!
                : order.shipperAddress!
            }
          ></AddressItem>
          <Typography>
            {order.recipientContact
              ? order.recipientContact && "Recipient contact"
              : order.shipperContact && "Shipper contact"}
          </Typography>
          {(order.shipperContact || order.recipientContact) && (
            <ContactItem
              contact={
                order.recipientContact
                  ? order.recipientContact!
                  : order.shipperContact!
              }
            ></ContactItem>
          )}
        </Grid>
        <Grid container item sm xs={12} direction="column">
          {products
            ?.filter((v) => v)
            .map((product) => (
              <ProductItem product={product!}></ProductItem>
            ))}
        </Grid>
      </Grid>
    </Paper>
  );
}
