const axios = require("axios");
var chai = require("chai");
var expect = chai.expect;

const url = "http://localhost:5000";

const clients = [
  {
    id: 1,
    Name: "John Doe",
    Address: "123 Slain Blvd",
    City: "Konoha",
    State: "Wakanda",
    Zip: "09876",
    Status: "active"
  }
];

const history = [
  {
    company: "CCJ",
    history: [
      {
        gallons: "500,000",
        address: "123 Slain Blvd Konoha,WK 09876",
        delivery: "September 1st 2007",
        price: "$1,000,000",
        amountDue: "$0"
      }
    ]
  },
  {
    company: "Centro comercial Moctezuma",
    history: [
      {
        gallons: "750,000",
        address: "123 Slain Blvd Konoha,WK 09876",
        delivery: "March 1st 2009",
        price: "$1,250,000",
        amountDue: "$0"
      }
    ]
  },
  {
    company: "Jericho",
    history: [
      {
        gallons: "800,000",
        address: "123 Slain Blvd Konoha,WK 09876",
        delivery: "January 1st 2009",
        price: "$1,400,000",
        amountDue: "$180,000"
      }
    ]
  }
];

// We have two API's

describe("get history data", function() {
  it("should return the history of clients", async function() {
    const APIData = await axios.get(url + "/api/history");
    const historyDataAPI = APIData.data;
    expect(history).to.eql(historyDataAPI);
  });
});

describe("get client data", function() {
  it("should return data of clients", async function() {
    const APIData = await axios.get(url + "/api/clients");
    const clientsDataAPI = APIData.data;
    expect(clients).to.eql(clientsDataAPI);
  });
});
