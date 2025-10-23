const assert = require("assert");
const app = require("../../src/app");

describe("complaintTypes service", () => {
  let thisService;
  let complaintTypeCreated;

  beforeEach(async () => {
    thisService = await app.service("complaintTypes");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (complaintTypes)");
  });

  describe("#create", () => {
    const options = {"complaintCategory":"new value","machineImage":true};

    beforeEach(async () => {
      complaintTypeCreated = await thisService.create(options);
    });

    it("should create a new complaintType", () => {
      assert.strictEqual(complaintTypeCreated.complaintCategory, options.complaintCategory);
assert.strictEqual(complaintTypeCreated.machineImage, options.machineImage);
    });
  });

  describe("#get", () => {
    it("should retrieve a complaintType by ID", async () => {
      const retrieved = await thisService.get(complaintTypeCreated._id);
      assert.strictEqual(retrieved._id, complaintTypeCreated._id);
    });
  });

  describe("#update", () => {
    let complaintTypeUpdated;
    const options = {"complaintCategory":"updated value","machineImage":false};

    beforeEach(async () => {
      complaintTypeUpdated = await thisService.update(complaintTypeCreated._id, options);
    });

    it("should update an existing complaintType ", async () => {
      assert.strictEqual(complaintTypeUpdated.complaintCategory, options.complaintCategory);
assert.strictEqual(complaintTypeUpdated.machineImage, options.machineImage);
    });
  });

  describe("#delete", () => {
  let complaintTypeDeleted;
    beforeEach(async () => {
      complaintTypeDeleted = await thisService.remove(complaintTypeCreated._id);
    });

    it("should delete a complaintType", async () => {
      assert.strictEqual(complaintTypeDeleted._id, complaintTypeCreated._id);
    });
  });
});