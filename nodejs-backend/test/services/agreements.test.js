const assert = require("assert");
const app = require("../../src/app");

describe("agreements service", () => {
  let thisService;
  let agreementCreated;

  beforeEach(async () => {
    thisService = await app.service("agreements");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (agreements)");
  });

  describe("#create", () => {
    const options = {"customerName":"aasdfasdfasdfadsfadfa","machineAddress":"new value","additionalDetail":"new value","tenancyPeriod":1761097387865};

    beforeEach(async () => {
      agreementCreated = await thisService.create(options);
    });

    it("should create a new agreement", () => {
      assert.strictEqual(agreementCreated.customerName, options.customerName);
assert.strictEqual(agreementCreated.machineAddress, options.machineAddress);
assert.strictEqual(agreementCreated.additionalDetail, options.additionalDetail);
assert.strictEqual(agreementCreated.tenancyPeriod, options.tenancyPeriod);
    });
  });

  describe("#get", () => {
    it("should retrieve a agreement by ID", async () => {
      const retrieved = await thisService.get(agreementCreated._id);
      assert.strictEqual(retrieved._id, agreementCreated._id);
    });
  });

  describe("#update", () => {
    let agreementUpdated;
    const options = {"customerName":"345345345345345345345","machineAddress":"updated value","additionalDetail":"updated value","tenancyPeriod":null};

    beforeEach(async () => {
      agreementUpdated = await thisService.update(agreementCreated._id, options);
    });

    it("should update an existing agreement ", async () => {
      assert.strictEqual(agreementUpdated.customerName, options.customerName);
assert.strictEqual(agreementUpdated.machineAddress, options.machineAddress);
assert.strictEqual(agreementUpdated.additionalDetail, options.additionalDetail);
assert.strictEqual(agreementUpdated.tenancyPeriod, options.tenancyPeriod);
    });
  });

  describe("#delete", () => {
  let agreementDeleted;
    beforeEach(async () => {
      agreementDeleted = await thisService.remove(agreementCreated._id);
    });

    it("should delete a agreement", async () => {
      assert.strictEqual(agreementDeleted._id, agreementCreated._id);
    });
  });
});