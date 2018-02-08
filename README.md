# COGovernorTracker

This API provides access to the database of 2018 Colorado Governor Candidates and those who have contributed to their campaign.

# Endpoints

# GETS

```/api/v1/candidates```

description:
a get to this endpoint will reterieve all the candidates in the database

return:

```
{  
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
