# MOCK Company Invoice App (Angular 2+)

Please note Angular CLI was used to complete this task because it’s recommended by Angular team way to create Angular apps.
It generates build folder in /public to keep all assets in it (as it was described in task description)

# Dependencies

- sqlite3
- node
- npm
- angular-cli

# Getting Started

###### Install npm dependencies
`npm install`

###### Run the node server
`node app.js`

###### Viewing the application in your browser
`http://localhost:8000`

###### To regenerate project use 
`npm run build`

###### Start local dev server that will upload files from src folder and perform server autoupdate when it comes to changing files in the project
`npm run serve`


# Schema

## Customers

- id (integer)
- name (string)
- address (string)
- phone (string)


## Products

- id (integer)
- name (string)
- price (decimal)

## Invoices

- id (integer)
- customer_id (integer)
- discount (decimal)
- total (decimal)

## InvoiceItems

- id (integer)
- invoice_id (integer)
- product_id (integer)
- quantity (decimal)


# Resources

## Customers
```
GET|POST          /api/customers
GET|PUT|DELETE    /api/customers/{id}
```

## Products
```
GET|POST          /api/products
GET|PUT|DELETE    /api/products/{id}
```
## Invoices
```
GET|POST          /api/invoices
GET|PUT|DELETE    /api/invoices/{id}
```

## InvoiceItems
```
GET|POST          /api/invoices/{id}/items
GET|PUT|DELETE    /api/invoices/{invoice_id}/items/{id}
```


