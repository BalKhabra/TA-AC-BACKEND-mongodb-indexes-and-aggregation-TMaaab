writeCode

Insert the data present in users.json into local mongodb database using `mongoimport` into a database called sample and collection named as users.

Write aggregation queries to perform following tasks.

1. Find all users who are active.
db.users.aggregate([{$match: {isActive: true}}, {$group: {_id: null, count: {$sum: 1}}}])

2. Find all users whose name includes `blake` case insensitive.
db.users.createIndex({name: 'text'})
db.users.find({$text: {$search: 'blake'}})
3. Find all males.
db.users.aggregate([{$match: {gender: 'male'}}, {$group: {_id: null, count: {$sum: 1}}}])

4. Find all active males.
db.users.aggregate([
  {$match: {gender: 'male', isActive: true}},
  {$group: {_id: null, count: {$sum: 1}}}
  ])
5. Find all active females whose age is >= 25.
db.users.aggregate([
  {$match: {gender: 'female', isActive: true, age: {$gte: 25}}},
  {$group: {_id: null, count: {$sum: 1}}}
])
6. Find all 40+ males with green eyecolor.
db.users.aggregate([
  {$match: {gender: 'male', eyeColor: 'green'}},
  {$group: {_id: null, count: {$sum: 1}}}
])
7. Find all blue eyed men working in 'USA'.
db.users.aggregate([
  {$match: {gender: 'male', eyeColor: 'blue', 'company.location.country': 'USA'}},
  {$group: {_id: null, count: {$sum: 1}}}
])
8. Find all female working in Germany with green eyes and apple as favoriteFruit.
db.users.aggregate([
  {$match: {gender: 'female', eyeColor: 'green', 'company.location.country': 'Germany', "favoriteFruit": "apple"}},
  {$group: {_id: null, count: {$sum: 1}}}
])
9. Count total male and females.
db.users.aggregate([
  {$group: {_id: '$gender', count: {$sum: 1}}}
])
10. Count all whose eyeColor is green.
db.users.aggregate([
  {$match: {eyeColor: 'green'}},
  {$group: {_id: 'null', count: {$sum: 1}}}
])
11. Count all 20+ females who have brown eyes.
db.users.aggregate([
  {$match: {eyeColor: 'brown', gender: 'female'}},
  {$group: {_id: 'null', count: {$sum: 1}}}
])
12. Count all occurences of all eyeColors.
    Something like:-
blue -> 30
brown -> 67
green -> 123

db.users.aggregate([
  {$match: {}},
  {$group: {_id: '$eyeColor', count: {$sum: 1}}}
])
```
blue -> 30
brown -> 67
green -> 123
```

13. Count all females whose tags array include `amet` in it.
db.users.aggregate([
  {$match: {gender: 'female', tags: 'amet'}},
  {$group: {_id: null, count: {$sum: 1}}}
])
14. Find the average age of entire collection
db.users.aggregate([
  {$match: {}},
  {$group: {_id: null, avg_age: {$avg: '$age'}}}
])
15. Find the average age of males and females i.e. group them by gender.
db.users.aggregate([
  {$match: {}},
  {$group: {_id: '$gender', avg_age: {$avg: '$age'}}}
])
16. Find the user with maximum age.
db.users.aggregate([
  {$group: {_id: '$_id', max_age: {$max: '$age'}}}
])
17. Find the document with minimum age.
db.users.aggregate([
  {$group: {_id: 'null', min_age: {$min: '$age'}}}
])
18. Find the sum of ages of all males and females.
db.users.aggregate([
  {$group: {_id: '$gender', sum_age: {$sum: 1}}}
])
19. Group all males by their eyeColor.
db.users.aggregate([
  {$match: {gender: 'male'}},
  {$group: {_id: '$eyeColor', count: {$sum: 1}}}
])
20. group all 30+ females by their age.
db.users.aggregate([
  {$match: {gender: 'female'}},
  {$group: {_id: '$age'}}
])
21. Group all 23+ males with blue eyes working in Germany.
db.users.aggregate([
  {$match: {eyeColor: 'blue', gender: 'male', 'company.location.country': 'Germany'}},
  {$group: {_id: '$name'}}
])
22. Group all by tag names i.e. use \$unwind since tags are array.
db.users.aggregate([
  { $unwind: "$tags" },
  {
    $group: {
      _id: "$tags"
    },
  },
]);
23. Group all males whose favoriteFruit is `banana` who have registered before 2015.
db.users.aggregate([
  {$match: {gender: 'male', favoriteFruit: 'banana', registered: {$lte: ISODate('2015-01-01T00:00:00Z')}}}
])
24. Group all females by their favoriteFruit.
db.users.aggregate([
  {$match: {gender: 'female'}},
  {$group: {_id: '$favoriteFruit'}},
])
25. Scan all the document to retrieve all eyeColors(use db.COLLECTION_NAME.distinct);
db.users.distinct('eyeColor')

26. Find all apple loving blue eyed female working in 'USA'. Sort them by their registration date in descending order.
db.users.aggregate([
  {$match: {gender: 'female', eyeColor: 'blue', favoriteFruit: 'apple', 'company.location.country': 'USA'}},
  {$sort: {registered: 1}}
])
27. Find all 18+ inactive men and return only the fields specified below in the below provided format

```js
{
  name: "",
  email: '';
  identity: {
    eye: '',
    phone: '',
    location: ''
  }
}

db.users.aggregate([
  {$match: {gender: 'male', isActive: false}},
  {$project: {
    name: 1,
    email: 1,
    identity: {
      eye: '$eyeColor',
      phone: '$company.phone',
      location: '$company.location'
    }
  }},
])
```
