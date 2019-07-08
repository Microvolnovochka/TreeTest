const sum = require('./visualtree');
var obj = {
    "name":"root",
    "children":[
        {
            "name":"82",
            "children":[
                {
                    "name":"123",
                    "children":[]
                }
            ]
        },
        {
            "name":"132",
            "children":[
                {
                    "name":"744",
                    "children":[]
                },
                {
                    "name":"235",
                    "children":[]
                }
            ]
        }
    ]
};

test('visualising tree', () => {
  expect(sum(obj)).toBe(3);
});