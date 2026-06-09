const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("sample service", async () => {
  let thisService;
  let sampleCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("sample");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (sample)");
  });

  describe("#create", () => {
    const options = {"name":"new value"};

    beforeEach(async () => {
      sampleCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new sample", () => {
      assert.strictEqual(sampleCreated.name, options.name);
    });
  });

  describe("#get", () => {
    it("should retrieve a sample by ID", async () => {
      const retrieved = await thisService.Model.findById(sampleCreated._id);
      assert.strictEqual(retrieved._id.toString(), sampleCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value"};

    it("should update an existing sample ", async () => {
      const sampleUpdated = await thisService.Model.findByIdAndUpdate(
        sampleCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(sampleUpdated.name, options.name);
    });
  });

  describe("#delete", async () => {
    it("should delete a sample", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const sampleDeleted = await thisService.Model.findByIdAndDelete(sampleCreated._id);
      assert.strictEqual(sampleDeleted._id.toString(), sampleCreated._id.toString());
    });
  });
});