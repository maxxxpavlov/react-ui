import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import qs from "qs";
import { Pagination, Grid } from "@mui/material";
import {
  Criteria,
  IDictionary,
  WarehouseOrder,
  WareHousesOrdersResponse,
} from "./typings";
import { SearchCriteria } from "./SearchFilters";
import { WarehouseOrderItem } from "./WarehouseOrder";
import { IPagination } from "./coreTypings";
/* 

The app is divided into three comonents: Search criteria, sorting options (skipped), pagination and orders (result of the search)

I had a following plan:
  For each component:
     Build a static version
     Replace the static values with values from props 
     Make component dynamic (state and inverse/direct data flow)

What I Did
  I've never really worked with React, and I've never done serious work with interfaces (except once).
  But neither lazyness, nor feat of failture has stopped me.
  I have to understand concepts of React, Material UI, css, html, but in general abstracting things - 
  distinguish component by interface or reactive hiarchy. That is the thing I liked the most.
  Also I admired CSS - for it's simplicity and also powerness. I'll continue learning CSS.
  I spent 4 nights and an one to do the application, but I didn't focus only on programming.
  If I had a job so I can leave my city (or even Russland), I could focus all my time on studying.
  I have a lot of hobbies and I love to learn. I understand how your brain works and created own system for studying.
  And the main direction of my studying is Russian and English. Also, I love to think about everything and to try 
  find problems and solutions for them.

I didn't want to build an amazing app, with super modern interface build by latest design guides. I wanted to give an Idea
that I have enough knowledge and motivation to learn things. I tried to do as much and to make it the best. 
I learnt how Grid layouts works, how react helps to join interface and actions together and have a nice picture of 
the app, I tried to make code as understandable as I could, but I didn't have convention on it. So I will try to explain my code.
And in some cases I added TODOs, so you know that I knew about what should be improved.


Bon voyage.

*/

const sendRequest = (params: any) => {
  return axios({
    url: "/dev/wms/orders",
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "comma" });
    },
    params,
    headers: {
      authorization:
        "Bearer wms2b3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQCAS7Y/HHnaXGxjxGZsAIgZR7CIhX9O5aDfC1",
    },
  });
};

const defaultCriteria = {
  warehouseId: [],
  productIds: [],
  depositorsAccountsIds: [],
  type: [],
  status: [],
  dateOrderStart: new Date("2021-02-01T00:00:00Z"),
  dateOrderEnd: new Date(),
  showDeleted: true, // This is ignored for the sake of simplicity
  createdAtStart: new Date("2021-02-01T00:00:00Z"),
  createdAtEnd: new Date(),
  modifiedAtStart: new Date("2021-02-01T00:00:00Z"),
  modifiedAtEnd: new Date(),
};

function App() {
  const [criteria, setCriteria] = React.useState<Criteria>(defaultCriteria);
  const [pendingRunSearch, planRunSearch] = React.useState<boolean>(false);
  // Dictionaries is an object describing values in data. It's used to fill search input values and to display orders
  const [dictionaries, setDictionaries] = React.useState<IDictionary>();
  const [orders, setOrders] = React.useState<WarehouseOrder[]>([]);
  const [pagination, setPagination] = React.useState<IPagination>({
    page: 1,
    totalOrders: 0,
  });
  useEffect(() => {
    sendRequest({}).then((data: { data: WareHousesOrdersResponse }) => {
      setDictionaries(data.data.dictionaries);
    });
  }, []);
  const search = () => {
    sendRequest({
      ...criteria,
      limit: 10,
      offset: (pagination.page - 1) * 10,
    }).then((data: { data: WareHousesOrdersResponse }) => {
      setOrders(data.data.orders);
      setPagination({
        page: data.data.offset / 10 + 1,
        totalOrders: data.data.total,
      });
    });
    planRunSearch(false);
  };
  const runSearch = () => {
    planRunSearch(true);
  };

  if (pendingRunSearch) {
    search();
  }

  // TODO: Divide into components. This component is too large and diffuse
  return (
    <Grid container alignItems="center">
      <Grid xs={12} sm={2} item alignItems="center">
        {dictionaries && (
          <SearchCriteria
            dictionaries={dictionaries}
            criteria={criteria}
            setCriteria={setCriteria}
            runSearch={runSearch}
          ></SearchCriteria>
        )}
      </Grid>
      <Grid sm={8} xs={12} item alignItems="end">
        {orders.map((order) => {
          return (
            <WarehouseOrderItem
              dictionaries={dictionaries!}
              order={order}
            ></WarehouseOrderItem>
          );
        })}
        {/* TODO: Do not show pagination when orders is empty */}
        <Grid container item justifyContent="center">
          <Pagination
            page={pagination.page}
            classes={{
              root: "Pagination-max-width",
            }}
            onChange={(event, value) => {
              setPagination({ ...pagination, page: value });
              runSearch();
            }}
            count={Math.ceil(pagination.totalOrders / 100)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
