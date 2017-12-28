##### Node.JS MySQL Create, Read, Update, and Delete (CRUD) Example

##Table Data

```
| id | artist_name | genre  | label | country |
| -- | ----------- | -----  | ----- | ------- |
| 1  | james blunt |  jazz  | crazy |    UK   |
| 2  |justin biber |Hip Hop | nice  | Canada  |
```
* List table
  ```
  node app
  ```
* Add new record
 ```
 node app --action add --name "Rick Ross" --genre "Hip Hop" --label "Self" --country "United States"
 ```
* Update one record
  ```
  node app --action update --id 5 --name "Raymond" --genre "Bongo Flava" --label "Wasafi" --country "Tanzania"
  ```
* Delete record
  ```
  node app --action delete --id 5
  ```
  
> rely on 
> ```mysql``` And ```console.table```