import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper }  from '@material-ui/core';

const useStyles = makeStyles({
  tableContainer: {
    width: '50%',
    margin: '10px auto',
    backgroundColor: 'rgba(255,255,255,0.02)',

  },
  tableTitle: {
    fontSize: '16px',
    fontWeight: 600,
    textAlign: 'center',
    color: 'white',
  },
  tableBody: {
    textAlign: 'center',
    color: 'white'
  },
});

const createData = (airworksLayer: string, customLayer: string) => {
  return { airworksLayer, customLayer };
}

const parser = (jsonData: any) => {
	//reverse map logic goes here
	
};

export default function LayerMapTable() {
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
            // check console to see how [row] state variable data structure looks like
            console.group("State:row")
            console.log(rows)
            console.groupEnd()
            // to pretty print json in browser console
            console.group("JSON file")
            console.log(JSON.stringify(data, null, 2))
            console.groupEnd()


            // uncomment below lines once logic for parser is complete
            // let newRows = parser(data)
            // setRows(newRows)
        })
        .catch((e) => {
          // error handling for json file not found
          console.error(e)
        })
  }, []);

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableTitle} >AirWorks layer name</TableCell>
            <TableCell className={classes.tableTitle} >Layer name from file</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.airworksLayer}>
              <TableCell className={classes.tableBody} component="th" scope="row">{row.airworksLayer}</TableCell>
              <TableCell className={classes.tableBody}>{row.customLayer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
