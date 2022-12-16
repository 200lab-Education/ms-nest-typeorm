# order-payment-microservices
An example project using a couple of _NestJS_ microservices with an _React_ frontend app.
_Redis_ is used as a read database and also acts as the message broker for the pub/sub communication between the microservices. 
All the events are persisted into a _PostgreSQL_ database.

## Description

### order
- Responsible for the management of orders
- Each order can only be at a single state at a time
- Order states: _created, confirmed, delivered, cancelled_
- Once an order is created, the **order** app publishes an event which is subscribed by the **payment** app to process a payment for the order
- If the payment of the order is declined, the order is set to _cancelled_
- If the payment of the order is confirmed, the order is set to _confirmed_
  - After _X_ amount of seconds a _confirmed_ order is automatically set to _delivered_
- Has endpoints to do the following:
  1. view all orders
  2. create an order
  3. cancel an order
  4. tracking order status

### payment
- Responsible for payment processing
- Each order is handled by the **payment** app by setting the payment of the order to _confirmed_ or _declined_ based on random logic
- Each payment is persisted into its own table in the _PostgreSQL_ database
- Once a payment is processed, the **payment** app publishes an event which is subscribed by the **order** app to continue with order processing

### client
- A user of the **client** app can do the following:
  1. view list of orders
  2. view the details of an order
  3. create an order
  4. cancel an order
- Implements socket listening message from server

## How to run?

#### order / payment
Copy the file _.env.example_ and set each environment variable accordingly.
```
$ cp .env.example .env
```
### move to root dir setel-assignment

### Start order services
```
$ yarn start:order 
```

### Start payment services
```
$yarn start:payment 
```

### Start client website
```
 $yarn start:client
```

## Build and run with Docker

```
cd ./setel-assignment
```

```
docker compose build
```

```
docker compose up
```
