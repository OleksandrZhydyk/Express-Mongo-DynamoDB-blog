export class RegisterUserDTO {
  name;
  email;
  password;
  avatarUrl;

  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.avatarUrl = data.avatarUrl;
  }
}

export class LoginUserDTO {
  email;

  constructor(data) {
    this.email = data.email;
  }
}

export class GetMeDTO {
  userId;

  constructor(data) {
    this.userId = data.userId;
  }
}

export class RegisterGetMeUserOutputDTO {
  id;
  email;
  name;
  avatarUrl;
  createdAt;
  updatedAt;

  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.avatarUrl = data.avatarUrl;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}

export class LoginChecksDTO {
  id;
  email;
  name;
  avatarUrl;
  createdAt;
  updatedAt;
  passwordHash;

  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.avatarUrl = data.avatarUrl;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.passwordHash = data.passwordHash;
  }
}
