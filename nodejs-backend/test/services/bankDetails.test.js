const assert = require("assert");
const app = require("../../src/app");

describe("bankDetails service", () => {
  let thisService;
  let bankDetailCreated;

  beforeEach(async () => {
    thisService = await app.service("bankDetails");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (bankDetails)");
  });

  describe("#create", () => {
    const options = {"bankName":"new value","accountNumber":23,"registeredAccountName":"new value"};

    beforeEach(async () => {
      bankDetailCreated = await thisService.create(options);
    });

    it("should create a new bankDetail", () => {
      assert.strictEqual(bankDetailCreated.bankName, options.bankName);
assert.strictEqual(bankDetailCreated.accountNumber, options.accountNumber);
assert.strictEqual(bankDetailCreated.registeredAccountName, options.registeredAccountName);
    });
  });

  describe("#get", () => {
    it("should retrieve a bankDetail by ID", async () => {
      const retrieved = await thisService.get(bankDetailCreated._id);
      assert.strictEqual(retrieved._id, bankDetailCreated._id);
    });
  });

  describe("#update", () => {
    let bankDetailUpdated;
    const options = {"bankName":"updated value","accountNumber":100,"registeredAccountName":"updated value"};

    beforeEach(async () => {
      bankDetailUpdated = await thisService.update(bankDetailCreated._id, options);
    });

    it("should update an existing bankDetail ", async () => {
      assert.strictEqual(bankDetailUpdated.bankName, options.bankName);
assert.strictEqual(bankDetailUpdated.accountNumber, options.accountNumber);
assert.strictEqual(bankDetailUpdated.registeredAccountName, options.registeredAccountName);
    });
  });

  describe("#delete", () => {
  let bankDetailDeleted;
    beforeEach(async () => {
      bankDetailDeleted = await thisService.remove(bankDetailCreated._id);
    });

    it("should delete a bankDetail", async () => {
      assert.strictEqual(bankDetailDeleted._id, bankDetailCreated._id);
    });
  });
});