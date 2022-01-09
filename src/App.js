import React, {useEffect, useState} from 'react';
import './App.css';
import MaterialTable from 'material-table';

//import Background from "./share-now-fleet-hero-banner.jpeg";

function addToFleet(car) {
    return fetch('http://localhost:3001/fleet', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'post', //put/delete
        body: JSON.stringify(car),
    })
        .then((r) => {
            if (!r.ok) {
                return Promise.reject();
            }
        })
        .then(() => {
            return fetch('http://localhost:3001/fleet')
                .then((r) => r.json());
        });
}

function deleteFromFleet(carId) {
    return fetch(`http://localhost:3001/fleet/${carId}`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'delete', //put/delete
    })
        .then((r) => {
            if (!r.ok) {
                return Promise.reject();
            }
        })
        .then(() => {
            return fetch('http://localhost:3001/fleet')
                .then((r) => r.json());
        });
}

function editFleet(carId, car) {
    return fetch(`http://localhost:3001/fleet/${carId}`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'put', //put/delete
        body: JSON.stringify(car)
    })
        .then((r) => {
            if (!r.ok) {
                return Promise.reject();
            }
        })
        .then(() => {
            return fetch('http://localhost:3001/fleet')
                .then((r) => r.json());
        });
}

function App() {

    const [tableData, setTableData] = useState(false);
    useEffect(() => {
        fetch('http://localhost:3001/fleet')
            .then((r) => r.json())
            .then((carlist) => setTableData(carlist));
    }, []);
    const columns = [
        {title: "Marca", field: "marca", emptyValue: () => <em>null</em>, filterPlaceholder: `Marca`, align: "center"},
        {title: "Tipul", field: "tipul", emptyValue: () => <em>null</em>, filterPlaceholder: `Tipul`, align: "center"},
        {
            title: "An fabricatie",
            field: "an_fabricatie",
            emptyValue: () => <em>null</em>,
            defaultSort: "asc",
            filterPlaceholder: `An fabricatie`,
            align: "center"
        },
        {
            title: "Rulaj",
            field: "km_parcursi",
            emptyValue: () => <em>null</em>,
            sorting: false,
            filterPlaceholder: `Rulaj`,
            grouping: false,
            align: "center"
        },
        {
            title: "Data urmatoarei revizii",
            field: "data_urmatoarei_revizii",
            align: "center",
            emptyValue: () => <em>null</em>,
            type: "date",
            filterPlaceholder: `Revizii`
        },
        {
            title: "Valabilitate RCA",
            field: "rca",
            emptyValue: () => <em>null</em>,
            type: "date",
            filterPlaceholder: `RCA`,
            align: "center"
        },
        {
            title: "Valabilitate ITP",
            field: "itp",
            emptyValue: () => <em>null</em>,
            type: "date",
            filterPlaceholder: `ITP`,
            align: "center"
        },
        {
            title: "Beneficiar",
            field: "beneficiar",
            emptyValue: () => <em>null</em>,
            filterPlaceholder: `Client`,
            align: "center"
        },
    ]

    if (!tableData) {
        return <div>Loading fleet...</div>
    }

    return (
        <div className="App">
            <div className="header">
                <h1 className="title">Fleet Manager</h1>
            </div>

            <MaterialTable columns={columns} data={tableData} title="Lista autovehicule in exploatare"
                           editable={{
                               onRowAdd: (newRow) => {
                                   return addToFleet(newRow).then((carlist) => setTableData(carlist));
                               },
                               onRowUpdate: (selectedRow) => {
                                   return editFleet(selectedRow.id, selectedRow).then((carlist) => setTableData(carlist));
                               },
                               onRowDelete: (selectedRow) => {
                                   return deleteFromFleet(selectedRow.id).then((carlist) => setTableData(carlist));
                               }

                           }}
                           options={{
                               searchAutoFocus: true,
                               searchFieldVariant: "outlined",
                               filtering: true,
                               pageSizeOptions: [5, 10, 20, 50, 100],
                               paginationType: "stepped",
                               showFirstLastPageButtons: false,
                               paginationPosition: "both",
                               exportButton: true,
                               exportAllData: true,
                               addRowPosition: "first",
                               actionsColumnIndex: -1,
                               selection: true,
                               showSelectAllCheckbox: false,
                               showTextRowsSelected: false,
                               grouping: true,
                               columnsButton: true,
                           }}/>
        </div>
    );
}

export default App;
