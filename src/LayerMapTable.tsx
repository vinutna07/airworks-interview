import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper}  from '@material-ui/core';

const useStyles = makeStyles({
  tableContainer: {
    width: '60%',
    margin: '0px auto',
  },
  table: {
    minWidth: 650,
  },
});

const createData = (airworks_map: string, custom_map: string) => {
  return { airworks_map, custom_map };
}

const parser = (jsonData: any) => {
  // reverse map logic goes here
  let final = [];
  for (let i in  jsonData) {
    for (let j in jsonData[i].mapping){
      let reverse : any = {}
      reverse[jsonData[i].mapping[j]] = jsonData[i].name;
      final.push(createData(jsonData[i].mapping[j], jsonData[i].name));
    }
  }
  console.log(final)
  return final;
}

export default function SimpleTable() {
  const classes = useStyles();

  const [rows, setRows] = useState([
    createData('Airworks Layer A', 'Custom layer A'),
    createData('Airworks Layer B', 'Custom layer B'),
    createData('Airworks Layer C', 'Custom layer C'),
    createData('Airworks Layer D', 'Custom layer D'),
    createData('Airworks Layer E', 'Custom layer E'),
  ]);

  useEffect(() => {
      fetch("https://airworks-tileserver-dev.s3.us-east-2.amazonaws.com/Aravind/orders.json")
        .then((res) => res.json())
        .then((data) => {
            console.log(JSON.stringify(data, null, 2))
            // let newRows = parser(data)
            // setRows(newRows)
        })
        .catch((e) => {
          // error handling for json file not found should go here
          setRows([createData('no Data', 'no Data')])
          // console.error(e)
        })
  }, []);

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>AirWorks layer name</TableCell>
            <TableCell>Layer name from file</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.airworks_map}>
              <TableCell component="th" scope="row">
                {row.airworks_map}
              </TableCell>
              <TableCell>{row.custom_map}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
