import { UserFull, UserStore } from "../../models/user";

const userStore = new UserStore();

const mockUser: UserFull = {
  firstName: "Viet",
  lastName: "Hai",
  userName: "haidev99bk",
  password: "haidev99bk@12345",
};

describe("User model", () => {
  it("should create a new user", async () => {
    const result = await userStore.create(mockUser);

    expect((result as any)?.first_name).toBe("Viet");
  });

  it("should get the user", async () => {
    const userList = await userStore.getAll();
    const result = await userStore.getById(userList[0].id.toString());

    expect((result as any).first_name).toBe("Viet");
  });

  it("should update the user", async () => {
    const userList = await userStore.getAll();
    const result = await userStore.updateUserById(userList[0].id.toString(), {
      ...mockUser,
      lastName: "Harry",
    });

    expect((result as any)?.last_name).toBe("Harry");
  });

  it("should authenticate the user", async () => {
    const result = await userStore.authenticate(
      mockUser.userName,
      mockUser.password
    );

    expect((result as any).last_name).toBe("Harry");
  });

  it("should get all users", async () => {
    const result = await userStore.getAll();

    expect((result as any).length).toBe(1);
  });

  it("should delete user", async () => {
    const userList = await userStore.getAll();

    const result = await userStore.deleteUserById(userList[0].id.toString());

    expect((result as any)?.first_name).toBeUndefined();
  });
});
