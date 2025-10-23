const assert = require("assert");
const app = require("../../src/app");

describe("rentals service", () => {
  let thisService;
  let rentalCreated;

  beforeEach(async () => {
    thisService = await app.service("rentals");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (rentals)");
  });

  describe("#create", () => {
    const options = {"customerName":"aasdfasdfasdfadsfadfa","machineAddress":"new value","additionalDetail":"new value","emailAddress":"new value"};

    beforeEach(async () => {
      rentalCreated = await thisService.create(options);
    });

    it("should create a new rental", () => {
      assert.strictEqual(rentalCreated.customerName, options.customerName);
assert.strictEqual(rentalCreated.machineAddress, options.machineAddress);
assert.strictEqual(rentalCreated.additionalDetail, options.additionalDetail);
assert.strictEqual(rentalCreated.emailAddress, options.emailAddress);
    });
  });

  describe("#get", () => {
    it("should retrieve a rental by ID", async () => {
      const retrieved = await thisService.get(rentalCreated._id);
      assert.strictEqual(retrieved._id, rentalCreated._id);
    });
  });

  describe("#update", () => {
    let rentalUpdated;
    const options = {"customerName":"345345345345345345345","machineAddress":"updated value","additionalDetail":"updated value","emailAddress":"updated value"};

    beforeEach(async () => {
      rentalUpdated = await thisService.update(rentalCreated._id, options);
    });

    it("should update an existing rental ", async () => {
      assert.strictEqual(rentalUpdated.customerName, options.customerName);
assert.strictEqual(rentalUpdated.machineAddress, options.machineAddress);
assert.strictEqual(rentalUpdated.additionalDetail, options.additionalDetail);
assert.strictEqual(rentalUpdated.emailAddress, options.emailAddress);
    });
  });

  describe("#delete", () => {
  let rentalDeleted;
    beforeEach(async () => {
      rentalDeleted = await thisService.remove(rentalCreated._id);
    });

    it("should delete a rental", async () => {
      assert.strictEqual(rentalDeleted._id, rentalCreated._id);
    });
  });
});