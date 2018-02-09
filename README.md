# COGovernorTracker

This API provides access to the database of 2018 Colorado Governor Candidates and those who have contributed to their campaign.

# Endpoints

### GET

```/api/v1/candidates```

#### Description:
a get to this endpoint will reterieve all the candidates in the database

#### What it returns:

```
[{  
      "committee_id":20175032188,
      "candidate_id":20175032189,
      "last_name":"Barlock",
      "full_name":"Stephen Barlock",
      "committee_name":"Barlock For Governor",
      "party":"Republican",
      "active":"TRUE",
      "website":"https://www.barlockforgovernor.com/",
      "image":"http://msantray.fatcow.com/governor_photos/steve_barlock.metro.jpg"
   },
   {  
      "committee_id":20165031873,
      "candidate_id":20165031863,
      "last_name":"Bellamy",
      "full_name":"VŽronique Bellamy",
      "committee_name":"Frenemies Of VŽronique Bellamy For Governor",
      "party":"Green",
      "active":"FALSE",
      "website":"",
      "image":"http://msantray.fatcow.com/governor_photos/veronique_bellamy.jpg"
   },
   {  
      "committee_id":null,
      "candidate_id":20185033497,
      "last_name":"Blanchard",
      "full_name":"Renee Blanchard",
      "committee_name":"",
      "party":"Democrat",
      "active":"TRUE",
      "website":"",
      "image":""
   }
  ]
 ```
 
 ```/api/v1/contributions```
 
 #### Description:
 a get to this endpoint will retieve all the contributors in the 2018 CO Governor campaign. If you include a zipcode query parameter, the API will return all the contributors within that zip (example ```/api/v1/contributions?80220```
 
 #### What it returns:
 
 ```
[
  {
    "committee_id":20165031883,
    "committee_name":"NOEL FOR COLORADO",
    "contribution_amount":-25,
    "contribution_date":"7/28/17 0:00",
    "donor_last":"STEELER",
    "donor_first":"MELISSA",
    "donor_address":"6965 E 3RD AVE",
    "donor_city":"DENVER",
    "donor_state":"CO",
    "donor_zip":80220,
    "record_id":4673277,
    "contribution_type":"Monetary (Itemized)",
    "donor_type":"Individual",
    "committee_type":"Candidate Committee",
    "candidate_name":"NOEL GINSBURG",
    "donor_employer":"",
    "donor_occupation":"",
    "Jurisdiction":"STATEWIDE"
  },
  {
    "committee_id":20165031883,
    "committee_name":"NOEL FOR COLORADO",
    "contribution_amount":25,
    "contribution_date":"7/28/17 0:00",
    "donor_last":"STEELER",
    "donor_first":"MELISSA",
    "donor_address":"6965 E 3RD AVE",
    "donor_city":"DENVER",
    "donor_state":"CO",
    "donor_zip":80220,
    "record_id":4673278,
    "contribution_type":"Monetary (Itemized)",
    "donor_type":"Individual",
    "committee_type":"Candidate Committee",
    "candidate_name":"NOEL GINSBURG",
    "donor_employer":"SELF EMPLOYED",
    "donor_occupation":"Healthcare/Medical",
    "Jurisdiction":"STATEWIDE"
  },
  {
    "committee_id":20175032139,
    "committee_name":"POLIS FOR COLORADO",
    "contribution_amount":-100,
    "contribution_date":"8/9/17 0:00",
    "donor_last":"",
    "donor_first":"",
    "donor_address":"",
    "donor_city":"",
    "donor_state":"",
    "donor_zip":null,
    "record_id":4637494,
    "contribution_type":"Monetary (Non-Itemized)",
    "donor_type":"",
    "committee_type":"Candidate Committee",
    "candidate_name":"JARED S. POLIS",
    "donor_employer":"",
    "donor_occupation":"",
    "Jurisdiction":"STATEWIDE"
  },
  {
    "committee_id":20175032123,
    "committee_name":"GREG LOPEZ FOR GOVERNOR",
    "contribution_amount":575,
    "contribution_date":"8/24/17 0:00",
    "donor_last":"GOODMAN",
    "donor_first":"ALAN",
    "donor_address":"11777 SAN VICENTE BLVD #550",
    "donor_city":"LOS ANGELES",
    "donor_state":"CA",
    "donor_zip":90049,
    "record_id":4708808,
    "contribution_type":"Monetary (Itemized)",
    "donor_type":"Individual",
    "committee_type":"Candidate Committee",
    "candidate_name":"GREG LOPEZ",
    "donor_employer":"SELF EMPLOYED",
    "donor_occupation":"Real Estate Professional",
    "Jurisdiction":"STATEWIDE"
  } ] 
  ```
  
  ```/api/v1/candidates/:committeeId/contributors```
  
  #### Description:
  a get to this endpoint returns all the contributors that donated to a specific candidate. If candidate doesn't have an contributions or if the committee id doesn't match any id's on file, it will return a 404 error.
  
  #### What it returns: 
  
  for the endpoint ```/api/v1/candidates/20165031883/contributors```
  
 ```
 [{
    "committee_id":20165031883,
    "committee_name":"NOEL FOR COLORADO",
    "contribution_amount":-25,
    "contribution_date":"7/28/17 0:00",
    "donor_last":"STEELER",
    "donor_first":"MELISSA",
    "donor_address":"6965 E 3RD AVE",
    "donor_city":"DENVER",
    "donor_state":"CO",
    "donor_zip":80220,
    "record_id":4673277,
    "contribution_type":"Monetary (Itemized)",
    "donor_type":"Individual",
    "committee_type":"Candidate Committee",
    "candidate_name":"NOEL GINSBURG",
    "donor_employer":"",
    "donor_occupation":"",
    "Jurisdiction":"STATEWIDE"
  },
  {
    "committee_id":20165031883,
    "committee_name":"NOEL FOR COLORADO",
    "contribution_amount":25,
    "contribution_date":"7/28/17 0:00",
    "donor_last":"STEELER",
    "donor_first":"MELISSA",
    "donor_address":"6965 E 3RD AVE",
    "donor_city":"DENVER",
    "donor_state":"CO",
    "donor_zip":80220,
    "record_id":4673278,
    "contribution_type":"Monetary (Itemized)",
    "donor_type":"Individual",
    "committee_type":"Candidate Committee",
    "candidate_name":"NOEL GINSBURG",
    "donor_employer":"SELF EMPLOYED",
    "donor_occupation":"Healthcare/Medical",
    "Jurisdiction":"STATEWIDE"
  },
  {
    "committee_id":20165031883,
    "committee_name":"NOEL FOR COLORADO",
    "contribution_amount":1000,
    "contribution_date":"10/19/17 0:00",
    "donor_last":"SHIPPS",
    "donor_first":"THOMAS",
    "donor_address":"2455 W. 2ND AVE.",
    "donor_city":"DURANGO",
    "donor_state":"CO",
    "donor_zip":81301,
    "record_id":4637351,
    "contribution_type":"Monetary (Itemized)",
    "donor_type":"Individual",
    "committee_type":"Candidate Committee",
    "candidate_name":"NOEL GINSBURG",
    "donor_employer":"SELF EMPLOYED",
    "donor_occupation":"Attorney/Legal",
    "Jurisdiction":"STATEWIDE"
  }]
  ```
  
  
  ### POST
  
  
  ```/api/v1/candidates```
  
  #### Description:
  
  A POST to this endpoint adds a new candidate to the database. In the body of the request, you must included the committee_id, last_name, full_name, 'candidate_id, 'committee_name', 'party', 'active'. If any of these parameters are missing, the request will return a 422 error status and tell you what parameter you are missing. A successful request will return a 201 status and the candidate's id in the table.
  
  #### What it returns: 
  
  ```{id: 42}```
  
  
  ```/api/v1/contributions```
  
  #### Description:
  
  A POST to this endpoint adds a new contributor to the database. In the body of the request, you must include the contributor's contribution_amount, contribution_date, donor_last, donor_first, donor_address, donor_city, donor_state, donor_zip, record_id, committee_type, and Jurisdiction. If these parameters are missing, the request will return a 422 error status with a message telling you which parameter you are missing. A successful request will return a 201 status and the contributors id in the table.
  
  #### What it returns: 
  
  ```{id: 10}```
  
  
  ### PATCH
  
  ```/api/v1/candidate/:committeeId```
  
  #### Description:
  
  You can patch a specific candidate in the database. In the body of the request, include the parameter you want to replace (ie record_id or party) and the value you want to change it to (ie 8734562 or 'Republican'). If the request is successful it will return a status of 202.
  
  
 ```/api/v1/contributions/:contributionId```
 
 #### Description: 
 
   You can patch a specific contributor in the database. In the body of the request, include the parameter you want to replace (ie donor_last or contribution_amount) and the value you want to change it to (ie 'Jenkins' or 100). If the request is successful it will return a status of 202.
   
 ### DELETE
 
 ```/api/v1/candidates/:committeId```
 
 #### Description: 
A delete request to this endpoint will delete a specific candidate in the database. In the fetch url you must include the candidates committeeId. If it is successful, it will return a 202 status.

```/api/v1/contributions/:contributionId```

#### Description
A delete request to this endpoint will delete a specific contributor in the database. In the fetch url you must include the contributors id. If it is successful, it will return a status of 202.
  
  
  
  
