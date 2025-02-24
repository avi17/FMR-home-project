import { InMemoryDbService } from "node_modules/angular-in-memory-web-api";

export class MockData implements InMemoryDbService {
  createDb() {
    let userDetails = [
      {
        id: Math.floor(100000 + Math.random() * 900000),
        name: "FMR",
        password: Math.floor(100000 + Math.random() * 900000),
      },
      {
        id: Math.floor(100000 + Math.random() * 900000),
        name: "Canidate",
        password: Math.floor(100000 + Math.random() * 900000),
      },
      {
        id: Math.floor(100000 + Math.random() * 900000),
        name: "test",
        password: Math.floor(100000 + Math.random() * 900000),
      },
      {
        id: Math.floor(100000 + Math.random() * 900000),
        name: "Avi",
        password: Math.floor(100000 + Math.random() * 900000),
      },
      {
        id: Math.floor(100000 + Math.random() * 900000),
        name: "Developer",
        password: Math.floor(100000 + Math.random() * 900000),
      },
      {
        id: Math.floor(100000 + Math.random() * 900000),
        name: "Team leader",
        password: Math.floor(100000 + Math.random() * 900000),
      },
    ];

    let orderDetails = userDetails.map((x) => {
      return {
        id: Math.floor(100000 + Math.random() * 900000),
        userId: x.id,
        total: Math.floor(100000 + Math.random() * 900000),
      };
    });

    orderDetails.push({
      id: Math.floor(100000 + Math.random() * 900000),
      userId: userDetails[0].id,
      total: Math.floor(100000 + Math.random() * 900000),
    })

    orderDetails.push({
      id: Math.floor(100000 + Math.random() * 900000),
      userId: userDetails[0].id,
      total: Math.floor(100000 + Math.random() * 900000),
    })
    return { users: userDetails, orders: orderDetails };
  }
}
