export default defineEventHandler(async (event) => {
  return [
    {
      "id": "1",
      "items": [
        {
          "id": 1,
          "name": "Item 1",
          "unit": "kg",
          "estimatedPrice": "10000",
          "image": "public/upload/image-1715295398337-60017.png",
          "amount": 5
        },
        {
          "id": 2,
          "name": "Item 2",
          "unit": "lembar",
          "estimatedPrice": "50000",
          "image": "public/upload/image-1715295398348-685412.png",
          "amount": 4
        }
      ],
      "agency": {
        "id": 1,
        "name": 1,
        "location": "Somewhere"
      },
      "customer": {
        "id": 1,
        "name": "Pak Abdul"
      },
      "type": "0",
      "status": "Success",
      "shippingCost": 0,
      "address": "Somewhere"
    },
    {
      "id": "2",
      "items": [
        {
          "id": 2,
          "name": "Item 2",
          "unit": "lembar",
          "estimatedPrice": "50000",
          "image": "public/upload/image-1715295398348-685412.png",
          "amount": 4
        }
      ],
      "agency": {
        "id": 1,
        "name": 1,
        "location": "Somewhere"
      },
      "customer": {
        "id": 1,
        "name": "Pak Abdul"
      },
      "type": "0",
      "status": "On Process",
      "shippingCost": 0,
      "address": "Somewhere"
    }
  ]
})
